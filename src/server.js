// Importa as dependências principais do projeto
const express = require("express")
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Cria uma instância da aplicação Express
const app = express()

/**
 * Configura o middleware CORS para permitir requisições do front-end.
 * Define a origem permitida, os métodos e os cabeçalhos autorizados.
 */
app.use(cors({
  origin: "http://localhost:5173", // origem do front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Permite que o Express entenda requisições com JSON no corpo
app.use(express.json())

// Permite envio de dados codificados na URL (ex: formulários)
app.use(express.urlencoded({ extended: true }))

// Importa e aplica as rotas de usuário (como login, cadastro etc.)
const userRoutes = require('./routes/UserRouter')

app.use('/api/v1/users', userRoutes)

/**
 * Configura o Express para confiar nos proxies (útil se estiver atrás de proxy reverso como Nginx).
 * Necessário em alguns casos para lidar corretamente com IPs e HTTPS.
 */
app.set('trust proxy', true)

/**
 * Middleware de tratamento global de erros.
 * Captura qualquer erro não tratado e retorna status 500.
 */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Erro interno do servidor")
})

/**
 * Configurações da documentação Swagger (OpenAPI 3.0).
 * Define metadados da API, autenticação com Bearer Token e onde buscar os comentários de rota.
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",               // Título da documentação
      version: "1.0.0",           // Versão da API
      description: "API",         // Descrição breve
      contact: {
        name: "Gustavonn07",      // Contato do desenvolvedor
      },
    },
    servers: [
      { url: "http://localhost:3000" } // URL base da API
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      { bearerAuth: [] }, // Aplica JWT como padrão de segurança
    ],
  },
  apis: ["./src/routes/**/*.js"], // Caminho dos arquivos com comentários Swagger
}

// Gera a documentação Swagger com base nas configurações acima
const swaggerDocs = swaggerJsDoc(swaggerOptions)

// Aplica a interface do Swagger na raiz do projeto ("/")
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Exporta o app para ser usado no servidor (ex: server.js ou tests)
module.exports = app
