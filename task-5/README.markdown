# CRUD Application with Node.js and MongoDB

## Overview

This is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express, and MongoDB with Mongoose. It allows you to manage a collection of users with basic operations.

## Features

- Create new users
- Read all users or a single user by ID
- Update existing user details
- Delete a user by ID

## Prerequisites

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/try/download/community)
- Ensure MongoDB is running locally on port 27017

## Installation

1. Clone the repository or create a new project directory.
2. Navigate to the project directory in your terminal.
3. Run `npm init -y` to initialize a new Node.js project.
4. Install dependencies: `npm install express mongoose`
5. Save the provided `app.js` file in the project directory.

## Running the Application

1. Start MongoDB locally.
2. Run the server: `node app.js`
3. The server will start at `http://localhost:3000`.

## API Endpoints

- **POST /api/users**
  - Create a new user
  - Body: `{ "name": "string", "email": "string", "age": number }`
  - Response: `201` with the created user object
- **GET /api/users**
  - Retrieve all users
  - Response: `200` with an array of user objects
- **GET /api/users/:id**
  - Retrieve a single user by ID
  - Response: `200` with the user object or `404` if not found
- **PUT /api/users/:id**
  - Update a user by ID
  - Body: `{ "name": "string", "email": "string", "age": number }`
  - Response: `200` with the updated user object or `404` if not found
- **DELETE /api/users/:id**
  - Delete a user by ID
  - Response: `200` with `{ "message": "User deleted" }` or `404` if not found

## Testing with Hoppscotch

1. Install Hoppscotch (https://hoppscotch.io/).
2. Use the following settings:
   - **Create**: `POST http://localhost:3000/api/users` with JSON body
   - **Read All**: `GET http://localhost:3000/api/users`
   - **Read One**: `GET http://localhost:3000/api/users/:id`
   - **Update**: `PUT http://localhost:3000/api/users/:id` with JSON body
   - **Delete**: `DELETE http://localhost:3000/api/users/:id`

