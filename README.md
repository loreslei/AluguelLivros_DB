# 🧪 backend-test

API REST em Node.js com autenticação via JWT, documentação Swagger, Prisma ORM e suporte a PostgreSQL.

---

## 📦 Tecnologias e Dependências

- **Node.js 20+** – Ambiente de execução JavaScript
- **Express** – Framework minimalista para construção de APIs
- **Prisma** – ORM moderno para integração com PostgreSQL
- **JWT (jsonwebtoken)** – Autenticação baseada em tokens
- **bcrypt** – Criptografia de senhas
- **dotenv** – Variáveis de ambiente
- **swagger-jsdoc + swagger-ui-express** – Documentação automática da API
- **yup** – Validação de dados
- **cors** – Middleware para habilitar CORS
- **nodemon** – Atualização automática em ambiente de desenvolvimento

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/backend-test.git
cd backend-test
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo .env com base no .env.example:

```bash
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
```

### 4. Inicializar o banco de dados (PostgreSQL)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Inicializar o banco de dados (PostgreSQL)

Em modo desenvolvimento (com auto reload)

```bash
npm run start:dev
```

Em modo produção

```bash
npm run start:prod
```

## 📂 Estrutura de Pastas
├── src
│   ├── routes/         # Arquivos de rotas da API (ex: UserRouter.js)
│   ├── services/       # Lógica de negócio (ex: UserService.js)
│   ├── shared/         # Validações e utilitários compartilhados
│   └── server.js       # Configuração principal do Express
├── prisma/
│   └── schema.prisma   # Definição do modelo de banco de dados
├── index.js            # Arquivo de entrada principal
├── .env                # Variáveis de ambiente (não versionar)
├── .env.example        # Modelo de .env
└── README.md