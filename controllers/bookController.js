const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, createdBy: req.user.id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ msg: 'Error creating book' });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 5, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    res.json({ book, averageRating: avgRating.toFixed(1), reviews });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ msg: 'Search query is required' });

    const regex = new RegExp(q, 'i'); 

    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: 'Search failed' });
  }
};

