const http = require('http');
const PORT = 3000;

//server
const server = http.createServer((req, res) => {
    console.log(`Received a ${req.method} request for: ${req.url}`);

    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/') {
        res.statusCode = 200;
        res.write('Welcome to the Home Page!');
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.write('This is a simple Node.js server without frameworks.');
    } else {
        res.statusCode = 404;
        res.write('404: Page Not Found');
    }

    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server.');
});