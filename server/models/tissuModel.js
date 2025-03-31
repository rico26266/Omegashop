
const mongoose = require("mongoose");

const tissuSchema = new mongoose.Schema({
  prix: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  numero: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tissu", tissuSchema);
