// Importa o cliente Prisma ORM para interação com o banco de dados
const { PrismaClient } = require("@prisma/client")
// Instancia o cliente do Prisma
const prisma = new PrismaClient()

/**
 * Serviço responsável por todas as operações relacionadas à entidade "Book".
 */
class CopyService {
  /**
   * Retorna os dados de um livro específico pelo ID.
   * @param {string} id - ID do livro a ser buscado.
   */
  async listCopy(id) {
    try {
      const copy = await prisma.copy.findUnique({ where: { copy_id: id } })

      if (copy) {

        return {
          type: "success",
          message: "Listagem de cópia bem-sucedida.",
          data: {
            id: copy.id,
            condition: copy.condition,
            available: copy.available,
            bar_code: copy.bar_code,
            book_id: copy.book_id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
          },
        }
      } else {
        return {
          type: "error",
          message: "Cópia não existente.",
        }
      }
    } catch (error) {
      console.error("Erro ao listar cópia:", error)
      throw error
    }
  }

  /**
   * Retorna todas as cópias cadastradas.
   */
  async listAllCopies() {
    try {
      const copies = await prisma.copy.findMany()

      if (copies.length) {
        return {
          type: "success",
          message: "Listagem de cópias bem-sucedida.",
          data: copies,
        }
      } else {
        return {
          type: "error",
          message: "Nenhuma cópia encontrada.",
        }
      }
    } catch (error) {
      console.error("Erro ao listar cópias:", error)
      throw error
    }
  }

  /**
   * Cria um novo livro no sistema. verificar isso aq 
   * Valida e verifica duplicidade de isbn
   * @param {object} data - Objeto contendo título, isbn, data de publicaçaõ e publicador.
   */
  async createCopy(data) {
    try {
      
      const existingCopy = await prisma.copy.findUnique({
        where: { bar_code: data.bar_code },
      })

      if (existingCopy) {
        return {
          type: "error",
          message: "Essa cópia já está cadastrada no sistema.",
        }
      }

      
      const newCopy = await prisma.copy.create({
        data: {
          condition: data.condition,
          available: data.available,
          bar_code: data.bar_code,
          book_id: data.book_id,
        },
      })

      return {
        type: "success",
        message: "Cópia criada com sucesso.",
        data: newCopy,
      }
    } catch (error) {
      console.error("Erro ao criar cópia:", error)
      throw error
    }
  }

  /**
   * Deleta uma cópia do sistema com base no ID.
   * @param {string} id - ID da cópia a ser deletada.
   */
  async deleteCopy(id) {
    try {
      const idNumber = Number(id);
      if (isNaN(idNumber)) {
        return { type: "error", message: "ID inválido." };
      }

      const copy = await prisma.copy.findUnique({ where: { copy_id: idNumber } })

      if (!copy) {
        return {
          type: "error",
          message: "Cópia não encontrada para deletar.",
        }
      }

      await prisma.copy.delete({ where: { copy_id: idNumber } })
      return {
        type: "success",
        message: "Cópia deletada com sucesso.",
      }
    } catch (error) {
      console.error("Erro ao deletar cópia:", error)
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
  async editCopy(id, data) {
    try {
      const idNumber = Number(id);
      if (isNaN(idNumber)) {
        return { type: "error", message: "ID inválido." };
      }
      const copy = await prisma.copy.findUnique({ where: { copy_id: idNumber } })

      if (!copy) {
        return {
          type: "error",
          message: "Cópia não encontrada para atualização.",
        }
      }

      const updateData = {
        condition: data.condition,
        available: data.available,
        bar_code: data.bar_code,
        book_id: data.book_id,
      }

      const updatedCopy = await prisma.copy.update({
        where: { copy_id: idNumber },
        data: updateData,
      })

      return {
        type: "success",
        message: "Cópia atualizada com sucesso.",
        data: {
          id: updatedCopy.id,
          condition: updatedCopy.condition,
          available: updatedCopy.available,
          bar_code: updatedCopy.bar_code,
          book_id: updatedCopy.book_id,
          createdAt: updatedCopy.createdAt,
          updatedAt: updatedCopy.updatedAt,
        },
      }
    } catch (error) {
      console.error("Erro ao editar cópia:", error)
      throw error
    }
  }
}

// Exporta a classe para ser utilizada pelos controladores
module.exports = CopyService
