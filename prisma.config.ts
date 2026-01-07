const { defineConfig } = require("prisma/config");

module.exports = defineConfig({
  migrate: {
    datasource: {
      url: process.env.DATABASE_URL,
    },
  },
});
