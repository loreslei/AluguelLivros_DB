// Importa o cliente Prisma ORM para interação com o banco de dados
const { PrismaClient } = require("@prisma/client")
// Instancia o cliente do Prisma
const prisma = new PrismaClient()

/**
 * Serviço responsável por todas as operações relacionadas à entidade "Book".
 */
class BookService {
  /**
   * Retorna os dados de um livro específico pelo ID.
   * @param {string} id - ID do livro a ser buscado.
   */
    async listBook(id) {
      try {
        const idNumber = Number(id)
        if (isNaN(idNumber)) {
          return { type: 'error', message: 'ID inválido.' }
        }

        const book = await prisma.book.findUnique({
          where: { id: idNumber },
          include: { author: true },
        })

        if (!book) {
          return {
            type: 'error',
            message: 'Livro não encontrado.',
          }
        }

        return {
          type: 'success',
          message: 'Livro encontrado.',
          data: book,
        }
      } catch (error) {
        console.error('Erro ao buscar livro:', error)
        throw error
      }
    }

    async listAllBooks() {
      try {
        const books = await prisma.book.findMany({
          include: { author: true, copies: true },
        })

        if (!books.length) {
          return {
            type: 'error',
            message: 'Nenhum livro encontrado.',
          }
        }

        return {
          type: 'success',
          message: 'Listagem de livros realizada com sucesso.',
          data: books,
        }
      } catch (error) {
        console.error('Erro ao listar livros:', error)
        throw error
      }
    }


  /**
   * Cria um novo livro no sistema.
   * Valida e verifica duplicidade de isbn
   * @param {object} data - Objeto contendo título, isbn, data de publicaçaõ e publicador.
   */
  async createBook(data) {
    if (!data.authorId) {
      return {
        type: 'error',
        message: 'authorId é obrigatório.',
      }
    }

    const authorExists = await prisma.author.findUnique({
      where: { id: data.authorId },
    })

    if (!authorExists) {
      return {
        type: 'error',
        message: 'Autor não encontrado.',
      }
    }

    const book = await prisma.book.create({
      data: {
        title: data.title,
        isbn: data.isbn,
        publication_year: data.publication_year,
        publisher: data.publisher,
        authorId: data.authorId,
      },
      include: {
        author: true,
      },
    })

    return {
      type: 'success',
      data: book,
    }
  }

  /**
   * Deleta um livro do sistema com base no ID.
   * @param {string} id - ID do livro a ser deletado.
   */
  async deleteBook(id) {
    try {
      const idNumber = Number(id)
      if (isNaN(idNumber)) {
        return { type: "error", message: "ID inválido." }
      }

      const book = await prisma.book.findUnique({
        where: { id: idNumber },
      })

      if (!book) {
        return {
          type: "error",
          message: "Livro não encontrado para deletar.",
        }
      }

      await prisma.book.delete({
        where: { id: idNumber },
      })

      return {
        type: "success",
        message: "Livro deletado com sucesso.",
      }
    } catch (error) {
      console.error("Erro ao deletar livro:", error)
      throw error
    }
  }

  /**
   * Edita os dados de um usuário existente.
   * Pode atualizar nome, e-mail, senha e role.
   * Verifica duplicidade de e-mail e valida nova senha (se fornecida).
   * @param {string} id - ID do usuário a ser atualizado.
   * @param {object} data - Dados a serem atualizados.
   */
  async editBook(id, data) {
    try {
      const idNumber = Number(id)
      if (isNaN(idNumber)) {
        return { type: "error", message: "ID inválido." }
      }

      const book = await prisma.book.findUnique({
        where: { id: idNumber },
      })

      if (!book) {
        return {
          type: "error",
          message: "Livro não encontrado para atualização.",
        }
      }

      const updatedBook = await prisma.book.update({
        where: { id: idNumber },
        data: {
          title: data.title,
          isbn: data.isbn,
          publication_year: data.publication_year,
          publisher: data.publisher,
        },
      })

      return {
        type: "success",
        message: "Livro atualizado com sucesso.",
        data: updatedBook,
      }
    } catch (error) {
      console.error("Erro ao editar livro:", error)
      throw error
    }
  }
}

// Exporta a classe para ser utilizada pelos controladores
module.exports = BookService
