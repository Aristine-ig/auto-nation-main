# AutoNation Backend API

A Node.js backend API for Instagram automation platform built with Express.js, Prisma, and Clerk authentication.

## Features

- 🔐 Authentication with Clerk
- 📊 User management and profiles
- 🤖 Instagram automation management
- 📈 Analytics and reporting
- 🔗 Integration management
- 🛡️ Security with rate limiting and helmet
- 📝 Comprehensive API documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Clerk account for authentication

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your database URL, Clerk keys, and other configuration

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## API Endpoints

### Public Endpoints

- `GET /health` - Health check
- `GET /api/v1/status` - API status and information

### Protected Endpoints (require authentication)

#### Users
- `GET /api/v1/protected/user` - Get user profile
- `PUT /api/v1/protected/user` - Update user profile

#### Automations
- `GET /api/v1/protected/automations` - Get all automations
- `POST /api/v1/protected/automations` - Create new automation
- `GET /api/v1/protected/automations/:id` - Get specific automation
- `PUT /api/v1/protected/automations/:id` - Update automation
- `DELETE /api/v1/protected/automations/:id` - Delete automation

#### Integrations
- `GET /api/v1/protected/integrations` - Get user integrations

#### Analytics
- `GET /api/v1/protected/analytics` - Get user analytics

## Authentication

This API uses Clerk for authentication. Include the session token in the Authorization header:

```
Authorization: Bearer <your-session-token>
```

## Database Schema

The API uses Prisma with PostgreSQL. Key models include:

- **User**: User profiles and authentication
- **Subscription**: User subscription plans
- **Automation**: Instagram automation configurations
- **Integrations**: Third-party service connections
- **Keywords**: Trigger keywords for automations
- **Posts**: Instagram post data
- **DMs**: Direct message data

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build (no-op for Node.js)

### Database Operations

- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio for database management

## Security Features

- Rate limiting (100 requests per 15 minutes per IP)
- Helmet for security headers
- CORS configuration
- Input validation and sanitization
- Authentication required for protected routes

## Error Handling

The API includes comprehensive error handling with:

- Structured error responses
- Logging for debugging
- Graceful shutdown handling
- 404 handling for unknown routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.