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
// db.fillDatabaseWithMockData(10);

// Use this only if you want to reset all mock data - Disabled after use
// console.log(db.deleteMockData());

// Init http server
httpServer = http.createServer( (request, response) => {

    if (request.url === '/') {
        _responseServer(response, JSON.stringify({message: 'Nothing here'}));
    }

    let urlParsed = _parseUrl(request.url);

    if (urlParsed.length > 0) {
        let Rest = new REST(db);

        // Get
        if (request.method === 'GET') {

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

    }
    else {
        _404(response);
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

// function _parseUrl(url) {
//     let urlArr = [];
    
//     urlArr = url.split('/');
//     urlArr.shift();
//     return urlArr;
// }

function _parseUrl(url) {
    let paramsUrl = [];
    let matchUrl = /products(\/\d+)?/i.test(url);
    if (matchUrl) {
        paramsUrl = url.split('/');
        paramsUrl.shift();
        if (paramsUrl[paramsUrl.length - 1] === '') {
            paramsUrl.pop();
        }
    }
    return paramsUrl;
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