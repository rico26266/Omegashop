const express = require('express');
const router = express.Router();
const Commentaire = require('../models/Commentaire');

router.post('/', async (req, res) => {
  const { tissuId, nom, message, note } = req.body;
  const commentaire = new Commentaire({ tissuId, nom, message, note });
  await commentaire.save();
  res.json({ success: true });
});

router.get('/:tissuId', async (req, res) => {
  const commentaires = await Commentaire.find({ tissuId: req.params.tissuId }).sort({ date: -1 });
  res.json(commentaires);
});

module.exports = router;
