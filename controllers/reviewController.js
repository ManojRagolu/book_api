const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const existing = await Review.findOne({ book: req.params.id, user: req.user.id });
    if (existing) return res.status(400).json({ msg: 'You already reviewed this book' });

    const review = new Review({
      book: req.params.id,
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ msg: 'Failed to add review' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ msg: 'Review not found or unauthorized' });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ msg: 'Failed to update review' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ msg: 'Review not found or unauthorized' });

    res.json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ msg: 'Failed to delete review' });
  }
};
