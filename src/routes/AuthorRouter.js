const express = require('express')
const router = express.Router()

const {
  createAuthor,
  getAuthorById,
  getAllAuthors,
  editAuthor,
  deleteAuthor,
} = require('../controllers/AuthorController')

router.post('/register', createAuthor)
router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.put('/:id', editAuthor)
router.delete('/:id', deleteAuthor)

module.exports = router
