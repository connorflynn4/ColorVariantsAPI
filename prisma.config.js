require("dotenv").config();
const { defineConfig } = require("@prisma/config");

module.exports = defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    provider: "sqlite",
    // Prisma 7 expects a string URL here
    url: process.env.DATABASE_URL || "file:./dev.db",
  },
});
