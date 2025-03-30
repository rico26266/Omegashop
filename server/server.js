const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/client', express.static(path.join(__dirname, '../client')));

mongoose.connect('mongodb://localhost:27017/tissus', { useNewUrlParser: true, useUnifiedTopology: true });

const Tissu = require('./models/Tissu');
const commentaireRoutes = require('./routes/comments');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/admin/tissu', upload.single('image'), async (req, res) => {
  const { numero, prix, description, categorie, categorie_personnalisee } = req.body;
  const image = '/uploads/' + req.file.filename;
  const finalCategorie = (categorie === 'AUTRE' && categorie_personnalisee) ? categorie_personnalisee : categorie;
  const tissu = new Tissu({ numero, prix, description, image, categorie: finalCategorie });
  await tissu.save();
  res.redirect('/client/admin.html?success=true');
});

app.get('/api/tissus', async (req, res) => {
  const tissus = await Tissu.find().sort({ _id: -1 });
  res.json(tissus);
});

app.use('/api/commentaires', commentaireRoutes);

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));


app.get('/api/tissus/:id', async (req, res) => {
  const tissu = await Tissu.findById(req.params.id);
  res.json(tissu);
});
