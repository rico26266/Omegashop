
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/Tmp", express.static(path.join(__dirname, "Tmp")));

const tissuRoutes = require("./routes/tissuRoutes");
const commentRoutes = require("./routes/comments");

app.use(tissuRoutes);
app.use(commentRoutes);

// Servir index.html à la racine
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connecté"))
.catch(err => console.error("Erreur MongoDB :", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en ligne sur le port ${port}`);
});
