// Importa o serviço responsável pela lógica de negócios relacionada a usuários
const UserService = require('../service/UserService.js')
const userService = new UserService()

/**
 * Controlador de rotas relacionadas a usuários.
 * Cada função aqui atua como intermediária entre as requisições HTTP e a lógica da camada de serviço.
 */
module.exports = {
  /**
   * Cria um novo usuário com os dados fornecidos no corpo da requisição (req.body).
   * Retorna status 201 em caso de sucesso ou 400 em caso de erro (ex: e-mail duplicado ou senha inválida).
   */
  async createUser(req, res) {
    const result = await userService.createUser(req.body)
    res.status(result.type === 'success' ? 201 : 400).json(result)
  },

  /**
   * Realiza login de usuário verificando e-mail e senha.
   * Retorna um token JWT e os dados do usuário se a autenticação for bem-sucedida.
   * Status 200 para sucesso e 401 para falha de autenticação.
   */
  async loginUser(req, res) {
    const { email, password } = req.body
    const result = await userService.loginUser(email, password)
    res.status(result.type === 'success' ? 200 : 401).json(result)
  },

  /**
   * Retorna os dados de um usuário específico com base no ID fornecido na URL (req.params.id).
   * Status 200 se encontrado, 404 se o usuário não existir.
   */
  async getUserById(req, res) {
    const result = await userService.listUser(req.params.id)
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Lista todos os usuários do sistema.
   * Retorna status 200 se houver usuários, ou 404 se a lista estiver vazia.
   */
  async getAllUsers(_, res) {
    const result = await userService.listAllUsers()
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Deleta um usuário com base no ID passado na URL.
   * Retorna 200 em caso de sucesso ou 404 se o usuário não for encontrado.
   */
  async deleteUser(req, res) {
    const result = await userService.deleteUser(req.params.id)
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Edita os dados de um usuário com base no ID fornecido na URL e nos dados enviados no corpo da requisição.
   * Deve retornar 200 se a atualização for bem-sucedida, ou 404 se o usuário não for encontrado.
   */
  async editUser(req, res) {
    const { email, password, name, role } = req.body
    userService.editUser(req.params.id, { email, password, name, role })
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },
}
