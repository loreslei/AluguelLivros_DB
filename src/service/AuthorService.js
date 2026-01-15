const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class AuthorService {
  async getAuthorById(id) {
    try {
      const idNumber = Number(id)
      if (isNaN(idNumber)) {
        return { type: 'error', message: 'ID inválido.' }
      }

      const author = await prisma.author.findUnique({
        where: { id: idNumber },
        include: { books: true },
      })

      if (!author) {
        return {
          type: 'error',
          message: 'Autor não encontrado.',
        }
      }

      return {
        type: 'success',
        message: 'Autor encontrado.',
        data: author,
      }
    } catch (error) {
      console.error('Erro ao buscar autor:', error)
      throw error
    }
  }

  async getAllAuthors() {
    try {
      const authors = await prisma.author.findMany({
        include: { books: true },
      })

      if (!authors.length) {
        return {
          type: 'error',
          message: 'Nenhum autor encontrado.',
        }
      }

      return {
        type: 'success',
        message: 'Listagem de autores realizada com sucesso.',
        data: authors,
      }
    } catch (error) {
      console.error('Erro ao listar autores:', error)
      throw error
    }
  }

  async createAuthor(data) {
    try {
      const newAuthor = await prisma.author.create({
        data: {
          name: data.name,
          nationality: data.nationality,
          birth_date: new Date(data.birth_date),
        },
      })

      return {
        type: 'success',
        message: 'Autor criado com sucesso.',
        data: newAuthor,
      }
    } catch (error) {
      console.error('Erro ao criar autor:', error)
      throw error
    }
  }

  async editAuthor(id, data) {
    try {
      const idNumber = Number(id)
      if (isNaN(idNumber)) {
        return { type: 'error', message: 'ID inválido.' }
      }

      const author = await prisma.author.findUnique({
        where: { id: idNumber },
      })

      if (!author) {
        return {
          type: 'error',
          message: 'Autor não encontrado para atualização.',
        }
      }

      const updatedAuthor = await prisma.author.update({
        where: { id: idNumber },
        data: {
          name: data.name,
          nationality: data.nationality,
          birth_date: data.birth_date
            ? new Date(data.birth_date)
            : undefined,
        },
      })

      return {
        type: 'success',
        message: 'Autor atualizado com sucesso.',
        data: updatedAuthor,
      }
    } catch (error) {
      console.error('Erro ao editar autor:', error)
      throw error
    }
  }

  async deleteAuthor(id) {
    try {
      const idNumber = Number(id)
      if (isNaN(idNumber)) {
        return { type: 'error', message: 'ID inválido.' }
      }

      const author = await prisma.author.findUnique({
        where: { id: idNumber },
        include: { books: true },
      })

      if (!author) {
        return {
          type: 'error',
          message: 'Autor não encontrado.',
        }
      }

      if (author.books.length > 0) {
        return {
          type: 'error',
          message: 'Autor possui livros cadastrados e não pode ser removido.',
        }
      }

      await prisma.author.delete({
        where: { id: idNumber },
      })

      return {
        type: 'success',
        message: 'Autor removido com sucesso.',
      }
    } catch (error) {
      console.error('Erro ao deletar autor:', error)
      throw error
    }
  }
}

module.exports = AuthorService
