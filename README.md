<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Color Variants API - A NestJS API for managing color variants with filtering capabilities.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   ```

3. **Generate an API key:**
   ```bash
   npm run generate:api-key
   ```
   Copy the generated key and add it to your `.env` file:
   ```bash
   API_KEYS=cvk_your_generated_key_here
   ```

4. **Set up database:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed  # Optional: seed with sample data
   ```

5. **Start the server:**
   ```bash
   npm run start:dev
   ```

6. **Access the API:**
   - API: `http://localhost:3000/api`
   - Swagger Docs: `http://localhost:3000/api/docs`
   - Health Check: `http://localhost:3000/api/health`

## Project setup

```bash
$ npm install
```

## Environment Configuration

Create a `.env` file in the root directory based on `.env.example`:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=file:./dev.db

# API Configuration
API_PREFIX=api
```

### Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development, production, test)
- `DATABASE_URL` - Database connection URL (default: file:./dev.db)
- `API_PREFIX` - API route prefix (default: api)
- `CORS_ORIGIN` - CORS allowed origins (comma-separated for production, default: *)
- `THROTTLE_TTL` - Rate limit time window in seconds (default: 60)
- `THROTTLE_LIMIT` - Maximum requests per time window (default: 100)
- `API_KEYS` - Comma-separated list of valid API keys for write operations (required for POST/PUT/DELETE)

## Features

- ✅ **Environment Configuration** - Centralized config management with `.env` files
- ✅ **Error Handling** - Global exception filter with standardized error responses
- ✅ **Logging** - Request/response logging with NestJS Logger
- ✅ **Security** - Helmet security headers and configurable CORS
- ✅ **Rate Limiting** - Protection against API abuse
- ✅ **Health Checks** - `/health` endpoint for monitoring
- ✅ **API Documentation** - Swagger/OpenAPI docs at `/api/docs` (dev only)
- ✅ **Graceful Shutdown** - Proper cleanup on SIGTERM/SIGINT
- ✅ **Input Validation** - DTO validation with class-validator

## API Endpoints

- `GET /api/colors` - Get all colors with optional filtering - **Public**
  - Query params: `category`, `accessible`, `search`
- `POST /api/colors` - Create a new color - **Requires API Key**
- `GET /api/health` - Health check endpoint
- `GET /api/docs` - Swagger API documentation (development only)

## API Key Authentication

Write operations (POST, PUT, DELETE) require an API key for authentication.

### Generating an API Key

```bash
npm run generate:api-key
```

This will generate a secure API key like: `cvk_abc123...`

### Adding API Keys

Add the generated key(s) to your `.env` file:

```bash
API_KEYS=cvk_your_generated_key_here
```

For multiple keys, separate them with commas:

```bash
API_KEYS=cvk_key1,cvk_key2,cvk_key3
```

### Using API Keys

Include the API key in your requests using one of these methods:

**Option 1: X-API-Key header (recommended)**
```bash
curl -X POST http://localhost:3000/api/colors \
  -H "X-API-Key: cvk_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ocean Blue","hex":"#0066CC","rgb":"rgb(0, 102, 204)"}'
```

**Option 2: Authorization Bearer header**
```bash
curl -X POST http://localhost:3000/api/colors \
  -H "Authorization: Bearer cvk_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ocean Blue","hex":"#0066CC","rgb":"rgb(0, 102, 204)"}'
```

### Security Notes

- ✅ **Read operations (GET)** are public and don't require authentication
- 🔒 **Write operations (POST/PUT/DELETE)** require a valid API key
- 🔑 API keys are stored in environment variables - never commit them to git
- 🚫 Invalid or missing API keys will return `401 Unauthorized`

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
