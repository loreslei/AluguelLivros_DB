// Importa o serviço responsável pela lógica de negócios relacionada a usuários
const BookService = require('../service/BookService.js')
const bookService = new BookService()

/**
 * Controlador de rotas relacionadas a usuários.
 * Cada função aqui atua como intermediária entre as requisições HTTP e a lógica da camada de serviço.
 */
module.exports = {
  /**
   * Cria um novo usuário com os dados fornecidos no corpo da requisição (req.body).
   * Retorna status 201 em caso de sucesso ou 400 em caso de erro (ex: e-mail duplicado ou senha inválida).
   */
  async createBook(req, res) {
    const result = await bookService.createBook(req.body)
    res.status(result.type === 'success' ? 201 : 400).json(result)
  },


  /**
   * Retorna os dados de um usuário específico com base no ID fornecido na URL (req.params.id).
   * Status 200 se encontrado, 404 se o usuário não existir.
   */
  async getBookById(req, res) {
    const result = await bookService.listBook(req.params.id)
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Lista todos os livros do sistema.
   * Retorna status 200 se houver livros, ou 404 se a lista estiver vazia.
   */
  async getAllBooks(_, res) {
    const result = await bookService.listAllBooks()
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Deleta um usuário com base no ID passado na URL.
   * Retorna 200 em caso de sucesso ou 404 se o usuário não for encontrado.
   */
  async deleteBook(req, res) {
    const result = await bookService.deleteBook(req.params.id)
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },

  /**
   * Edita os dados de um usuário com base no ID fornecido na URL e nos dados enviados no corpo da requisição.
   * Deve retornar 200 se a atualização for bem-sucedida, ou 404 se o usuário não for encontrado.
   */
  async editBook(req, res) {
    // const { title, isbn, publication_date, publisher, author_id } = req.body
    const { title, isbn, publication_year, publisher} = req.body
    // const result = await bookService.editBook(req.params.id, { title, isbn, publication_date, publisher, author_id })
    const result = await bookService.editBook(req.params.id, { title, isbn, publication_year, publisher })
    res.status(result.type === 'success' ? 200 : 404).json(result)
  },
}

       