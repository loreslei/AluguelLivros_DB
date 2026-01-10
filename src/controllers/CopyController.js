// Importa o serviço responsável pela lógica de negócios relacionada a usuários
const CopyService = require('../service/CopyService.js')
const copyService = new CopyService()

/**
 * Controlador de rotas relacionadas a cópias.
 * Cada função aqui atua como intermediária entre as requisições HTTP e a lógica da camada de serviço.
 */
module.exports = {
  /**
   * Cria um novo usuário com os dados fornecidos no corpo da requisição (req.body).
   * Retorna status 201 em caso de sucesso ou 400 em caso de erro (ex: e-mail duplicado ou senha inválida).
   */
  async createCopy(req, res) {
    const result = await copyService.createCopy(req.body)
    res.status(result.type === 'success' ? 201 : 400).json(result)
  },


  /**
   * Retorna os dados de um usuário específico com base no ID fornecido na URL (req.params.id).
   * Status 200 se encontrado, 404 se o usuário não existir.
   */
  async getCopyById(req, res) {
    const result = await copyService.listCopy(req.params.id)
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Lista todas as cópias do sistema.
   * Retorna status 200 se houver cópias, ou 404 se a lista estiver vazia.
   */
  async getAllCopies(_, res) {
    const result = await copyService.listAllCopies()
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Deleta um usuário com base no ID passado na URL.
   * Retorna 200 em caso de sucesso ou 404 se o usuário não for encontrado.
   */
  async deleteCopy(req, res) {
    const result = await copyService.deleteCopy(req.params.id)
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Edita os dados de um usuário com base no ID fornecido na URL e nos dados enviados no corpo da requisição.
   * Deve retornar 200 se a atualização for bem-sucedida, ou 404 se o usuário não for encontrado.
   */
  async editCopy(req, res) {
    const { condition, available, bar_code, book_id } = req.body
    const result = await copyService.editCopy(req.params.id, { condition, available, bar_code, book_id })
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },
}

       