const express = require("express");
const router = express.Router();
const path = require("path");

// Page de témoignages
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/temoignages.html"));
});

module.exports = router;