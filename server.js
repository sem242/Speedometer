const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Get the file path
    let filePath = path.join(__dirname, pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>404 - Not Found</h1>');
            return;
        }

        // Get the file extension
        const ext = path.parse(filePath).ext;
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

        // Set cache control headers
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.setHeader('Content-Type', mimeType);

        // Stream the file
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('GPS Speedometer Server');
    console.log('='.repeat(50));
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`Server running at: http://127.0.0.1:${PORT}`);
    console.log('');
    console.log('Access from iPhone on same network:');
    console.log('  Find your computer\'s IP address');
    console.log(`  Navigate to: http://<your-ip>:${PORT}`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('='.repeat(50));
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('\nServer stopped.');
    process.exit(0);
});
