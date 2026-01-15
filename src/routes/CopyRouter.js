// Importa o Express e cria uma instância de roteador
const express = require('express')
const router = express.Router()

// Importa o controlador responsável pelas ações relacionadas aos usuários
const copyController = require('../controllers/CopyController')

/**
 * @route POST /register
 * @description Cria uma nova cópia no sistema.
 * Espera os dados no corpo da requisição (ex: condição, disponível, código de barras, ID do livro).
 */
router.post('/register', copyController.createCopy)


/**
 * @route GET /:id
 * @description Busca e retorna os dados de uma cópia específica pelo ID.
 */
router.get('/:id', copyController.getCopyByBookId)

/**
 * @route GET /
 * @description Lista todas as cópias cadastradas no sistema.
 */
router.get('/', copyController.getAllCopies)

/**
 * @route DELETE /:id
 * @description Remove um livro do sistema com base no ID fornecido.
 */
router.delete('/:id', copyController.deleteCopy)

/**
 * @route PUT /:id
 * @description Atualiza os dados de um livro existente com base no ID fornecido.
 * Espera os dados atualizados no corpo da requisição.
 */
router.put('/:id', copyController.editCopy)

// Exporta o roteador para ser usado no app principal
module.exports = router
