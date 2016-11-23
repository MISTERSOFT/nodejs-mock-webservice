/**
 * Node version : 6.9.1
 */

// Import
const Constants = require('./constants.js');

const http = require('http');
const Database = require('./database.js');
const REST = require('./Rest.js');

// Variables
let httpServer = null;
let db = new Database();

// Use this if you want fill the database - Disabled after use
// db.fillDatabaseWithMockData(1);

// Use this only if you want to reset all mock data - Disabled after use
// console.log(db.deleteMockData());

// Init http server
httpServer = http.createServer( (request, response) => {

    let Rest = new REST(db);

    // Get
    if (request.method === 'GET') {
        let urlParsed = _parseUrl(request.url);
        if (urlParsed.length === 1) {
            _responseServer(response, Rest.get().getJson());
        }
        else {
            _responseServer(response, Rest.get(urlParsed[1]).getJson());
        }
    }

    // Post
    if (request.method === 'POST') {

    }
    
    // Put
    if (request.method === 'PUT') {

    }

    // Delete
    if (request.method === 'DELETE') {

    }


    // switch (request.url) {
    //     case '/':
    //         response.statusCode = 200;
    //         response.setHeader('Content-Type', Constants.jsonHeader);
    //         response.end('<pre>Hello</pre>');
    //         break;

    //     case '/products':
    //         response.statusCode = 200;
    //         response.setHeader('Content-Type', Constants.jsonHeader);
    //         response.end('Hello');
    //         break;
        
    //     case '/blog':
    //         response.statusCode = 200;
    //         response.setHeader('Content-Type', Constants.jsonHeader);
    //         response.end('Blog');
    //         break;

    //     default:
    //         _404();
    //         break;
    // }
});

httpServer.listen(Constants.httpPort, Constants.host, () => {
    console.log(`Server running at http://${Constants.host}:${Constants.httpPort}/`);
});


//// Server methods

function _parseUrl(url) {
    let urlArr = url.split('/');
    urlArr.shift();
    return urlArr;
}


//// Response to Client

function _responseServer(response, json) {
    response.statusCode = 200;
    response.setHeader('Content-Type', Constants.jsonHeader);
    response.end(json);
}

// function _responseServerError(json) {
//     response.statusCode = 200;
//     response.setHeader('Content-Type', Constants.jsonHeader);
//     response.end(json);
// }

function _404(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', Constants.plainTextHeader);
    response.end('404 Not Found');
}