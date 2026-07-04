const express = require('express');
const router = express.Router();
const {
  renderHome,
  renderEditPage,
  createItemView,
  updateItemView,
  deleteItemView,
} = require('../controllers/itemController');

router.get('/', renderHome);
router.post('/items', createItemView);
router.get('/items/:id/edit', renderEditPage);
router.put('/items/:id', updateItemView);
router.delete('/items/:id', deleteItemView);

module.exports = router;
