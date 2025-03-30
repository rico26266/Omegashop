const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({
  tissuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tissu' },
  nom: String,
  message: String,
  note: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commentaire', CommentaireSchema);
