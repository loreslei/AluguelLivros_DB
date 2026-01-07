// Importa a biblioteca jsonwebtoken para gerar e verificar tokens JWT
const jwt = require('jsonwebtoken')

/**
 * Serviço responsável por gerar e verificar tokens JWT.
 * Encapsula a lógica de autenticação baseada em token.
 */
class JwtService {
  /**
   * @param {string} secret - A chave secreta usada para assinar/verificar os tokens.
   * @param {object} options - Opções adicionais, como tempo de expiração.
   * Se não for fornecido, usa o valor da variável de ambiente JWT_SECRET.
   */
  constructor(secret, options = {}) {
    this.secret = secret || process.env.JWT_SECRET
    this.options = { expiresIn: '1h', ...options } // Tempo padrão de expiração: 1 hora
  }

  /**
   * Gera um token JWT com base nos dados do usuário.
   * @param {object} user - Os dados do usuário que serão codificados no token.
   * @returns {string} Token JWT assinado.
   */
  generateToken(user) {
    return jwt.sign(user, this.secret, this.options)
  }

  /**
   * Verifica e decodifica um token JWT.
   * @param {string} token - O token JWT a ser verificado.
   * @returns {Promise<object>} Uma Promise que resolve com os dados decodificados, ou rejeita se o token for inválido.
   */
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          reject(err) // Token inválido ou expirado
        } else {
          resolve(decoded) // Token válido, retorna dados decodificados
        }
      })
    })
  }
}

// Exporta a classe JwtService para ser usada em outras partes da aplicação
module.exports = JwtService
