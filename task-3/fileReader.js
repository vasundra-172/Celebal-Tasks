// Original Callback-based Code
const fs = require('fs');

function readFilesCallback(file1, file2, callback) {
    let results = {};
    
    fs.readFile(file1, 'utf8', (err, data1) => {
        if (err) return callback(err);
        results.file1 = data1;
        
        fs.readFile(file2, 'utf8', (err, data2) => {
            if (err) return callback(err);
            results.file2 = data2;
            callback(null, results);
        });
    });
}

// Using the callback-based function
readFilesCallback('file1.txt', 'file2.txt', (err, results) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Results:', results);
});

// Promise-based Version
function readFilesPromise(file1, file2) {
    return new Promise((resolve, reject) => {
        let results = {};
        
        fs.readFile(file1, 'utf8', (err, data1) => {
            if (err) return reject(err);
            results.file1 = data1;
            
            fs.readFile(file2, 'utf8', (err, data2) => {
                if (err) return reject(err);
                results.file2 = data2;
                resolve(results);
            });
        });
    });
}

// Using the Promise-based function
readFilesPromise('file1.txt', 'file2.txt')
    .then(results => console.log('Promise Results:', results))
    .catch(err => console.error('Promise Error:', err));

// Async/Await Version
async function readFilesAsync(file1, file2) {
    try {
        const readFileAsync = (file) => {
            return new Promise((resolve, reject) => {
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            });
        };
        
        const data1 = await readFileAsync(file1);
        const data2 = await readFileAsync(file2);
        
        return { file1: data1, file2: data2 };
    } catch (err) {
        throw err;
    }
}

// Using the Async/Await function
(async () => {
    try {
        const results = await readFilesAsync('file1.txt', 'file2.txt');
        console.log('Async/Await Results:', results);
    } catch (err) {
        console.error('Async/Await Error:', err);
    }
})();