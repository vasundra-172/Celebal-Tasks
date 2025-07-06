# JWT Authentication API

A simple RESTful API implementing JSON Web Token (JWT) authentication using Node.js, Express, and JavaScript. This project provides user registration, login, and a protected route, with secure password hashing and input validation.

## Features
- **User Registration**: Create a new user with a username and password, returning a JWT.
- **User Login**: Authenticate users and issue a JWT.
- **Protected Route**: Access restricted endpoints using a valid JWT.
- **Security**:
  - Passwords hashed with bcrypt.
  - Input validation using express-validator.
  - Secure JWT generation and verification.

## Prerequisites
- **Node.js** (v14 or higher) and **npm**.
- A terminal for running commands.
- Optional: An HTTP client like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) for testing.

## Installation

1. **Clone or Create Project Directory**:
   ```bash
   mkdir jwt-auth-api
   cd jwt-auth-api
   ```

2. **Initialize Node.js Project**:
   ```bash
   npm init -y
   ```

3. **Install Dependencies**:
   ```bash
   npm install express jsonwebtoken bcryptjs express-validator dotenv
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   JWT_SECRET=your-secure-secret-key
   PORT=3000
   ```
   Replace `your-secure-secret-key` with a strong, random string (e.g., generate using `openssl rand -base64 32`).

## Running the Application
1. Start the server:
   ```bash
   node index.js
   ```
   The server will run at `http://localhost:3000`.

2. Test the API using an HTTP client.

## API Endpoints

### Register
- **URL**: `POST /auth/register`
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response** (201):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "id": 1, "username": "testuser" }
  }
  ```

### Login
- **URL**: `POST /auth/login`
- **Body**:
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "id": 1, "username": "testuser" }
  }
  ```

### Protected Route
- **URL**: `GET /auth/protected`
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
  ```json
  {
    "message": "This is a protected route",
    "user": { "id": 1, "username": "testuser", "iat": 1628234567, "exp": 1628238167 }
  }
  ```

