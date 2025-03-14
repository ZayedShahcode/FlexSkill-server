# FlexSkill Backend

A Node.js backend service for the FlexSkill application, providing user authentication, team management, and profile features.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Database
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens

## Features

- 🔐 User Authentication
  - Registration
  - Login/Logout
  - JWT-based session management
- 👥 User Management
  - Profile creation and updates
  - GitHub profile integration
  - User search and retrieval
- 🤝 Team Operations
  - Team creation
  - Member management
  - Team discovery
- 🔒 Secure password handling
- 🎯 RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
PORT=4000
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

4. Start the server
```bash
npm start
# or
yarn start
```

The server will be running at `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /sign/new` - Register new user
- `POST /sign/` - Login user
- `POST /sign/verify` - Verify JWT token
- `POST /sign/logout` - Logout user
- `GET /sign/user/:id` - Get user by ID

### Teams
- `GET /team` - Get all teams
- `POST /team` - Create new team
- `POST /team/join` - Join a team
- `POST /team/leave` - Leave a team
- `GET /team/:id` - Get team members
- `DELETE /team` - Delete a team

### Dashboard
- `GET /dash/:teamId` - Get team details

## Project Structure

```
backend/
├── controllers/        # Request handlers
├── middlewares/       # Custom middleware functions
├── model/            # Database models
├── routes/           # API routes
├── utils/            # Helper functions
├── app.js           # Express app setup
└── server.js        # Entry point
```

## Database Schema

### User Model
- id (Primary Key)
- username
- email
- password (hashed)
- teamId (Foreign Key)
- githubProfile
- createdAt
- updatedAt

### Team Model
- id (Primary Key)
- teamname
- teamDescription
- teamsize
- githubLink
- details
- teamLeader
- leaderName
- members (Array)
- createdAt
- updatedAt

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License. 