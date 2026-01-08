// Importa o Express e cria uma instância de roteador
const express = require('express')
const router = express.Router()

// Importa o controlador responsável pelas ações relacionadas aos usuários
const bookController = require('../controllers/BookController')

/**
 * @route POST /register
 * @description Cria um novo livro no sistema.
 * Espera os dados no corpo da requisição (ex: título, isbn, data de publicação, etc).
 */
router.post('/register', bookController.createBook)


/**
 * @route GET /:id
 * @description Busca e retorna os dados de um livro específico pelo ID.
 */
router.get('/:id', bookController.getBookById)

/**
 * @route GET /
 * @description Lista todos os livros cadastrados no sistema.
 */
router.get('/', bookController.getAllBooks)

/**
 * @route DELETE /:id
 * @description Remove um livro do sistema com base no ID fornecido.
 */
router.delete('/:id', bookController.deleteBook)

/**
 * @route PUT /:id
 * @description Atualiza os dados de um livro existente com base no ID fornecido.
 * Espera os dados atualizados no corpo da requisição.
 */
router.put('/:id', bookController.editBook)

// Exporta o roteador para ser usado no app principal
module.exports = router
