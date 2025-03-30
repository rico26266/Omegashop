const mongoose = require('mongoose');

const TissuSchema = new mongoose.Schema({
  numero: String,
  prix: Number,
  description: String,
  image: String,
  categorie: String
});

module.exports = mongoose.model('Tissu', TissuSchema);
