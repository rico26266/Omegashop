const express = require("express");
const app = express();
const path = require("path");

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "client")));

// Routes
app.use("/temoignages", require("./routes/tem.js")); // Témoignages
app.use("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "client/contact.html"));
});
app.use("/transport", (req, res) => {
  res.sendFile(path.join(__dirname, "client/transport.html"));
});
app.use("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "client/admin.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur en ligne sur le port ${PORT}`));
