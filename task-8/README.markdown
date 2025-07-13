# Enhanced Express.js Application

## Overview
This is an enhanced Express.js application that includes advanced features such as file upload functionality, comprehensive error handling, and integration with the OpenWeatherMap API. It serves as a robust backend for handling file uploads and fetching weather data.

## Features
- **File Upload**: Supports uploading JPEG, PNG, and PDF files with a 5MB size limit.
- **Weather API Integration**: Fetches current weather data for any city using the OpenWeatherMap API.
- **Error Handling**: Includes custom middleware for handling upload errors, API errors, and general server errors.
- **Static File Serving**: Serves uploaded files statically from the `uploads` directory.

## Prerequisites
- Node.js (version 14.x or later)
- npm (comes with Node.js)

## Installation

1. Clone the repository or create a new project directory:
   ```bash
   mkdir express-enhanced-app
   cd express-enhanced-app
   ```

2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

3. Install the required dependencies:
   ```bash
   npm install express multer axios dotenv
   ```

4. Create an `uploads` directory in the project root:
   ```bash
   mkdir uploads
   ```

## Configuration

1. **Obtain an API Key**:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) and generate an API key from the dashboard.
   - Create a `.env` file in the project root and add your API key:
     ```
     OPENWEATHER_API_KEY=your_api_key_here
     ```

2. **Add to `.gitignore`**:
   - Create a `.gitignore` file and add `.env` to prevent committing sensitive data:
     ```
     .env
     node_modules/
     ```

## Usage

1. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

2. Test the Application:
   - **Home Route**: Visit `http://localhost:3000` to see a welcome message.
   - **Weather Route**: Visit `http://localhost:3000/weather/london` to get weather data for London.
   - **File Upload**: Use a tool like Postman or Hoppscotch to send a `POST` request to `http://localhost:3000/upload` with a file (set `Content-Type` to `multipart/form-data` and use key `file`).

## API Endpoints

- `GET /`
  - Returns a welcome message.
- `POST /upload`
  - Uploads a file and returns file details.
  - Requires `multipart/form-data` with key `file`.
- `GET /weather/:city`
  - Fetches weather data for the specified city.

## Error Handling
- Custom middleware handles errors such as invalid file types, oversized files, and API request failures.
- Responses include appropriate status codes and error messages.

## Testing
- Use tools like Postman, Hoppscotch, or curl to test the endpoints.
- Example curl command for file upload:
  ```bash
  curl -X POST -F "file=@example.jpg" http://localhost:3000/upload
  ```
