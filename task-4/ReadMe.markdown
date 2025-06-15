## To run this server:

1. Create a new directory and initialize a Node.js project: `npm init -y`
2. Install Express: `npm install express`
3. Save the code in a file named `server.js`
4. Run the server: `node server.js`
5. Access `http://localhost:3000/` and `http://localhost:3000/about` in your browser

## The server includes:

- A logging middleware that tracks request method and URL
- A root endpoint (`/`) that returns a welcome message
- An about endpoint (`/about`) that returns a simple message
- Runs on port 3000 by default