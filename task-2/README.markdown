# File Management Tool

A simple file management tool built using Node.js core modules (`fs`, `path`, and `http`). This application provides a web interface to create, read, and delete files in a designated directory.

## Features
- **Create File**: Create a new file with a specified name and optional content.
- **Read File**: View the contents of an existing file.
- **Delete File**: Remove a file from the directory.
- Web-based interface for easy file management.
- Uses only Node.js core modules, no external dependencies.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or higher recommended) installed on your system.

## Setup Instructions
1. **Clone or Download the Repository**:
   - Clone this repository to your local machine or download the source code.

2. **Directory Structure**:
   Ensure the following structure is maintained in your project directory:
   ```
   project-directory/
   ├── file-management-tool.js
   ├── public/
   │   ├── index.html
   │   ├── client.js
   ├── files/
   ```
   - `file-management-tool.js`: The main Node.js server file.
   - `public/index.html`: The HTML template for the web interface.
   - `public/client.js`: The client-side JavaScript for handling file operations in the browser.
   - `files/`: A directory (created automatically) to store managed files.

3. **Run the Application**:
   - Open a terminal in the project directory.
   - Run the server using the command:
     ```bash
     node file-management-tool.js
     ```
   - The server will start on `http://localhost:3000`.

4. **Access the Application**:
   - Open a web browser and navigate to `http://localhost:3000`.
   - The web interface will display a form to create files and a list of existing files in the `files` directory.

## Usage
- **Create a File**:
  - Enter a filename and optional content in the form.
  - Click the "Create File" button to save the file in the `files` directory.
- **Read a File**:
  - Click the "Read" button next to a file in the list to display its contents.
- **Delete a File**:
  - Click the "Delete" button next to a file to remove it from the `files` directory.

## Endpoints
The application exposes the following HTTP endpoints:
- `GET /`: Serves the HTML interface (`index.html`).
- `GET /client.js`: Serves the client-side JavaScript.
- `GET /files`: Lists all files in the `files` directory as JSON.
- `GET /read/:filename`: Returns the content of the specified file.
- `POST /create`: Creates a new file with the provided filename and content (URL-encoded form data).
- `DELETE /delete/:filename`: Deletes the specified file.

## Technical Details
- **Modules Used**:
  - `fs.promises`: For asynchronous file operations.
  - `path`: For cross-platform file path handling.
  - `http`: For creating the web server.
- **File Storage**:
  - Files are stored in the `files` directory, created automatically in the project root.
- **Static Files**:
  - The `public` directory contains `index.html` and `client.js`, served as static files.
- **Error Handling**:
  - Basic error handling is implemented for file operations and server requests (e.g., 404 for missing files, 500 for server errors).

## Notes
- The application creates the `files` and `public` directories automatically if they do not exist.
- No external dependencies are required, making it lightweight and portable.
- Ensure the server has write permissions in the project directory to create and manage files.

## Troubleshooting
- If the server fails to start, verify that port `3000` is not in use by another application.
- Ensure Node.js is installed and accessible by running `node --version` in your terminal.
- If files are not being created or deleted, check the permissions of the `files` directory.
