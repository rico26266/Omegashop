const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("client")); // dossier frontend

// Exemple de route test
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Import des routes (si tu en as)
const temoignagesRoute = require("./routes/tem.js");
app.use("/api/temoignages", temoignagesRoute);

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB:", err));

// Lancer serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});