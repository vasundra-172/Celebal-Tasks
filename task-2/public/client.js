// Fetch and display files
async function loadFiles() {
    const response = await fetch('/files');
    const files = await response.json();
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = files.map(file => `
        <div class="file-item">
            ${file.name} 
            <button onclick="readFile('${file.name}')">Read</button>
            <button onclick="deleteFile('${file.name}')">Delete</button>
            <div id="content-${file.name}"></div>
        </div>
    `).join('');
}

// Read file content
async function readFile(filename) {
    const response = await fetch(`/read/${filename}`);
    const data = await response.text();
    document.getElementById(`content-${filename}`).innerText = data;
}

// Delete file
async function deleteFile(filename) {
    await fetch(`/delete/${filename}`, { method: 'DELETE' });
    loadFiles();
}

// Load files on page load
window.onload = loadFiles;