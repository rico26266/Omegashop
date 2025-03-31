
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for frontend
app.use("/client", express.static(path.join(__dirname, "../client")));
app.use("/Tmp", express.static(path.join(__dirname, "Tmp")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connecté avec succès"))
.catch((err) => console.error("Erreur de connexion MongoDB :", err));

// Routes
const tissuRoutes = require("./routes/tissuRoutes");
app.use("/api", tissuRoutes);

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
