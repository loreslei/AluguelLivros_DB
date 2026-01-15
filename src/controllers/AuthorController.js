const AuthorService = require('../service/AuthorService')
const authorService = new AuthorService()

const createAuthor = async (req, res) => {
  const result = await authorService.createAuthor(req.body)
  res.status(result.type === 'success' ? 201 : 400).json(result)
}

const getAuthorById = async (req, res) => {
  const result = await authorService.getAuthorById(req.params.id)
  res.status(result.type === 'success' ? 200 : 404).json(result)
}

const getAllAuthors = async (_, res) => {
  const result = await authorService.getAllAuthors()
  res.status(result.type === 'success' ? 200 : 404).json(result)
}

const editAuthor = async (req, res) => {
  const result = await authorService.editAuthor(req.params.id, req.body)
  res.status(result.type === 'success' ? 200 : 400).json(result)
}

const deleteAuthor = async (req, res) => {
  const result = await authorService.deleteAuthor(req.params.id)
  res.status(result.type === 'success' ? 200 : 400).json(result)
}

module.exports = {
  createAuthor,
  getAuthorById,
  getAllAuthors,
  editAuthor,
  deleteAuthor,
}
