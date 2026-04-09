const express = require('express');
const app = express();
const PORT = 3000;

//logging middleware
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request to ${req.url}`);
    next();
};

//Custom middleware
const addRequestInfo = (req, res, next) => {
    req.requestID = Math.floor(Math.random() * 10000);
    console.log(`Assigned Request ID: ${req.requestID}`);
    next();
};

//use middlewares
app.use(requestLogger);
app.use(addRequestInfo);


//auth middleware
const authenticate = (req, res, next) => {
    const isAdmin = req.query.admin === 'true';
    if (isAdmin) {
        console.log("Authentication successful: Admin access granted.");
        next();
    } else {
        console.log("Authentication failed: Access denied.");
        res.status(403).send('Forbidden: You do not have admin privileges.');
    }
};


//GET
app.get('/', (req, res) => {
    res.send(`Home Page. Your Request ID is: ${req.requestID}`);
});

app.get('/admin', authenticate, (req, res) => {
    res.send('Welcome to the Secret Admin Dashboard!');
});

//server
app.listen(PORT, () => {
    console.log(`Middleware demo running at http://localhost:${PORT}`);
});