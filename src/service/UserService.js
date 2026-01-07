// Importa o cliente Prisma ORM para interação com o banco de dados
const { PrismaClient } = require("@prisma/client")
// Importa a biblioteca bcrypt para hashing de senhas
const bcrypt = require("bcrypt")
// Importa utilitário para geração de token JWT
const jwtUtils = require("./JwtServices")
// Importa a função de validação de senha
const validatePassword = require("../shared/passwordValidation.js")

// Instancia o cliente do Prisma
const prisma = new PrismaClient()

/**
 * Serviço responsável por todas as operações relacionadas à entidade "User".
 * Contém métodos de CRUD e autenticação.
 */
class UserService {
  /**
   * Retorna os dados de um usuário específico pelo ID.
   * @param {string} id - ID do usuário a ser buscado.
   */
  async listUser(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })

      if (user) {
        return {
          type: "success",
          message: "Listagem de usuário bem-sucedida.",
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        }
      } else {
        return {
          type: "error",
          message: "Usuário não existente.",
        }
      }
    } catch (error) {
      console.error("Erro ao listar usuário:", error)
      throw error
    }
  }

  /**
   * Retorna todos os usuários cadastrados.
   */
  async listAllUsers() {
    try {
      const users = await prisma.user.findMany()

      if (users.length) {
        return {
          type: "success",
          message: "Listagem de usuários bem-sucedida.",
          data: users,
        }
      } else {
        return {
          type: "error",
          message: "Nenhum usuário encontrado.",
        }
      }
    } catch (error) {
      console.error("Erro ao listar usuários:", error)
      throw error
    }
  }

  /**
   * Cria um novo usuário no sistema.
   * Valida senha, verifica duplicidade de e-mail e salva usuário com senha criptografada.
   * @param {object} data - Objeto contendo nome, e-mail, senha e role do usuário.
   */
  async createUser(data) {
    try {
      const passwordValidation = await validatePassword(data.password)

      if (!passwordValidation.valid) {
        return {
          type: "error",
          message: passwordValidation.error,
          suggestion: passwordValidation.suggestion,
        }
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      })

      if (existingUser) {
        return {
          type: "error",
          message: "O e-mail já está em uso. Por favor, use outro e-mail.",
        }
      }

      const hashedPassword = await bcrypt.hash(data.password, 10)

      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: data.role,
        },
      })

      return {
        type: "success",
        message: "Usuário criado com sucesso.",
        data: newUser,
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
      throw error
    }
  }

  /**
   * Deleta um usuário do sistema com base no ID.
   * @param {string} id - ID do usuário a ser deletado.
   */
  async deleteUser(id) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return {
          type: "error",
          message: "Usuário não encontrado para deletar.",
        }
      }

      await prisma.user.delete({ where: { id } })

      return {
        type: "success",
        message: "Usuário deletado com sucesso.",
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error)
      throw error
    }
  }

  /**
   * Autentica um usuário com e-mail e senha.
   * Compara senhas com bcrypt e gera token JWT se válido.
   * @param {string} email 
   * @param {string} password 
   */
  async loginUser(email, password) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        return {
          type: "error",
          message: "Usuário não encontrado.",
        }
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return {
          type: "error",
          message: "Senha incorreta.",
        }
      }

      const token = jwtUtils.generateToken({ userId: user.id })

      return {
        type: "success",
        message: "Login bem-sucedido.",
        token,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
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
  async editUser(id, data) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })

      if (!user) {
        return {
          type: "error",
          message: "Usuário não encontrado para atualização.",
        }
      }

      // Se o e-mail foi alterado, verificar se já está em uso por outro
      if (data.email && data.email !== user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: data.email },
        })

        if (existingUser && existingUser.id !== id) {
          return {
            type: "error",
            message: "O e-mail informado já está em uso por outro usuário.",
          }
        }
      }

      const updateData = {
        name: data.name,
        email: data.email,
        role: data.role,
      }

      // Se a senha foi fornecida, validá-la e criptografar
      if (data.password) {
        const passwordValidation = await validatePassword(data.password)
        if (!passwordValidation.valid) {
          return {
            type: "error",
            message: passwordValidation.error,
            suggestion: passwordValidation.suggestion,
          }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        updateData.password = hashedPassword
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
      })

      return {
        type: "success",
        message: "Usuário atualizado com sucesso.",
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        },
      }
    } catch (error) {
      console.error("Erro ao editar usuário:", error)
      throw error
    }
  }
}

// Exporta a classe para ser utilizada pelos controladores
module.exports = UserService
