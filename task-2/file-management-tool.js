const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Directory for file operations
const baseDir = path.join(__dirname, 'files');
const publicDir = path.join(__dirname, 'public');

// Ensure the files and public directories exist
async function ensureDirectories() {
    try {
        await fs.mkdir(baseDir, { recursive: true });
        await fs.mkdir(publicDir, { recursive: true });
    } catch (err) {
        console.error('Error creating directories:', err);
    }
}

// Parse URL-encoded form data
function parseFormData(body) {
    const params = new URLSearchParams(body);
    return {
        filename: params.get('filename'),
        content: params.get('content') || ''
    };
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;

    try {
        await ensureDirectories();

        // Serve the main page
        if (url.pathname === '/' && method === 'GET') {
            const htmlContent = await fs.readFile(path.join(publicDir, 'index.html'), 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
            return;
        }

        // Serve static files (client.js)
        if (url.pathname === '/client.js' && method === 'GET') {
            const jsContent = await fs.readFile(path.join(publicDir, 'client.js'), 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(jsContent);
            return;
        }

        // List all files
        if (url.pathname === '/files' && method === 'GET') {
            const files = await fs.readdir(baseDir);
            const fileDetails = await Promise.all(
                files.map(async (file) => ({
                    name: file,
                    stats: await fs.stat(path.join(baseDir, file))
                }))
            );
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(fileDetails));
            return;
        }

        // Read a file
        if (url.pathname.startsWith('/read/') && method === 'GET') {
            const filename = path.basename(url.pathname);
            const filePath = path.join(baseDir, filename);
            try {
                const content = await fs.readFile(filePath, 'utf8');
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(content);
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
            return;
        }

        // Create a file
        if (url.pathname === '/create' && method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                const { filename, content } = parseFormData(body);
                if (!filename) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Filename is required');
                    return;
                }
                const filePath = path.join(baseDir, filename);
                try {
                    await fs.writeFile(filePath, content);
                    res.writeHead(201, { 'Content-Type': 'text/plain' });
                    res.end('File created');
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error creating file');
                }
            });
            return;
        }

        // Delete a file
        if (url.pathname.startsWith('/delete/') && method === 'DELETE') {
            const filename = path.basename(url.pathname);
            const filePath = path.join(baseDir, filename);
            try {
                await fs.unlink(filePath);
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File deleted');
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
            return;
        }

        // Handle 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});