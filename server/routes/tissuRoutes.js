
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Tissu = require("../models/tissuModel");

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../Tmp");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Ajouter un tissu
router.post("/admin/tissu", upload.single("photo"), async (req, res) => {
  try {
    const { prix, details, numero, categorie } = req.body;
    const photo = req.file ? "/Tmp/" + req.file.filename : null;

    const newTissu = new Tissu({ prix, details, numero, categorie, photo });
    await newTissu.save();
    res.status(201).json({ message: "Tissu ajouté avec succès", tissu: newTissu });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer tous les tissus
router.get("/tissus", async (req, res) => {
  try {
    const tissus = await Tissu.find();
    res.json(tissus);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
