const { createBook, getAllBooks, getBookById, searchBooks } = require('../controllers/bookController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
// const {
//   createBook,
//   getAllBooks,
//   getBookById,
// } = require('../controllers/bookController');
router.get('/search', searchBooks); 
router.post('/', auth, createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;
