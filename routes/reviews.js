const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// POST /api/reviews/bookID
router.post('/:id/reviews', auth, addReview); // Book ID

// PUT /api/reviews/reviewID
router.put('/:id', auth, updateReview);

// DELETE /api/reviews/reviewID
router.delete('/:id', auth, deleteReview);

module.exports = router;
