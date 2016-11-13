/**
 * Node version : 6.9.1
 */

// Import
const http = require('http');
const Database = require('./database.js');

// Constants
const host = 'localhost';
const httpPort = 3001;

// Variables
let httpServer = null;
let db = new Database();

// Use this if you want fill the database
db.fillDatabaseWithMockData(5);

// Use this only if you want to reset all mock data
// db.freshMockData();

// Init http server
httpServer = http.createServer( (request, response) => {
    switch (request.url) {
        case '/':
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Home');
            break;
        
        case '/blog':
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Blog');
            break;

        default:
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/plain');
            response.end('404 Not Found');
            break;
    }
});

httpServer.listen(httpPort, host, () => {
    console.log(`Server running at http://${host}:${httpPort}/`);
});
