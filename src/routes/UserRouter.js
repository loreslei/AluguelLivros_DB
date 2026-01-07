// Importa o Express e cria uma instância de roteador
const express = require('express')
const router = express.Router()

// Importa o controlador responsável pelas ações relacionadas aos usuários
const userController = require('../controllers/UserController')

/**
 * @route POST /register
 * @description Cria um novo usuário no sistema.
 * Espera os dados no corpo da requisição (ex: email, senha, nome, etc).
 */
router.post('/register', userController.createUser)

/**
 * @route POST /login
 * @description Realiza a autenticação do usuário.
 * Espera email e senha no corpo da requisição e retorna um token JWT se for bem-sucedido.
 */
router.post('/login', userController.loginUser)

/**
 * @route GET /:id
 * @description Busca e retorna os dados de um usuário específico pelo ID.
 */
router.get('/:id', userController.getUserById)

/**
 * @route GET /
 * @description Lista todos os usuários cadastrados no sistema.
 */
router.get('/', userController.getAllUsers)

/**
 * @route DELETE /:id
 * @description Remove um usuário do sistema com base no ID fornecido.
 */
router.delete('/:id', userController.deleteUser)

/**
 * @route PUT /:id
 * @description Atualiza os dados de um usuário existente com base no ID fornecido.
 * Espera os dados atualizados no corpo da requisição.
 */
router.put('/:id', userController.editUser)

// Exporta o roteador para ser usado no app principal
module.exports = router
