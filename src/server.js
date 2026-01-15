const express = require("express")
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bookRoutes = require('./routes/BookRouter')
const copyRoutes = require('./routes/CopyRouter')
const clientRoutes = require('./routes/ClientRouter') 
const authorRoutes = require('./routes/AuthorRouter')
const rentalRoutes = require('./routes/RentalRouter')

app.use('/api/v1/books', bookRoutes)
app.use('/api/v1/copies', copyRoutes)
app.use('/api/v1/clients', clientRoutes)
app.use('/api/v1/authors', authorRoutes)
app.use('/api/v1/rentals', rentalRoutes)

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API",
      contact: { name: "Gustavonn07" },
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Erro interno do servidor")
})

app.set('trust proxy', true)

module.exports = app
