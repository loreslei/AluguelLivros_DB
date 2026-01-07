// Importa o servidor configurado (Express app) da pasta src
const server = require('./src/server.js')

// Carrega variáveis de ambiente do arquivo .env para process.env
const dotenv = require('dotenv')
dotenv.config()

// Define a porta na qual o servidor irá escutar (vem do .env ou padrão 3000)
const port = process.env.PORT || 3000

// Inicia o servidor e escuta na porta definida
server.listen(port, () => {
  // Exibe o ambiente atual se não estiver em desenvolvimento (útil em produção)
  if (process.env.NODE_ENV !== 'development') console.log(process.env.NODE_ENV)

  // Confirma que o servidor está rodando
  console.log(`Server aberto em http://localhost:${port}/`)
})
