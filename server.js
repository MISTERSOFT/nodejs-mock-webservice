/**
 * Node version : 6.9.1
 */

// Import
const Constants = require('./constants.js');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const Database = require('./database.js');
const REST = require('./Rest.js');

// Variables
let app = express();
let httpServer = null;
let db = new Database();
let Rest = new REST(db);

// Use this if you want fill the database - Disabled after use
// db.fillDatabaseWithMockData(10);

// Use this only if you want to reset all mock data - Disabled after use
// console.log(db.deleteMockData());

// Init http server
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    let text = '';
    text += 'Hello !\n';
    text += 'You can use these routes bellow\n';
    text += '* GET :\n';
    text += '/products\n';
    text += '/products/:id\n';
    text += '* POST :\n';
    text += '/products => With params { title: "A title", description: "A description", price: 10 }\n';
    text += 'TODO';
    res.end(text);
});

// Feed database
app.get('/generate', (req, res, next) => {
    db.fillDatabaseWithMockData(10);
    let text = '';
    text += '10 products has been added\n';
    text += Rest.get().getJson();
    res.end(text);
});

app.get('/generate/:n', (req, res, next) => {
    db.fillDatabaseWithMockData(req.params.n);
});

// Destroy the database
app.get('/destroy', (req, res, next) => {
    db.deleteMockData();
    res.end('Database has been destroyed');
});

/**
 * GET
 */
app.get('/products', (req, res, next) => {
    _responseServer(res, Rest.get().getJson());
});

app.get('/products/:id', (req, res, next) => {
    res.end('Route: ' + req.url + ' => params = ' + req.params.id);
});

/**
 * POST
 */
app.post('/products', (req, res, next) => {
    // req.body.title
    res.end('/products => params = ' + req.body.title);
});

/**
 * PUT
 */
app.put('/products', (req, res, next) => {
    // req.body.id
    res.end(JSON.stringify({message: 'bjr'}));
});

/**
 * DELETE
 */
app.delete('/products/:id', (req, res, next) => {
    // req.params.id
    res.end(JSON.stringify({message: 'bjr'}));
});

// httpServer = http.createServer( (request, response) => {

//     if (request.url === '/') {
//         _responseServer(response, JSON.stringify({message: 'Nothing here'}));
//     }

//     let urlParsed = _parseUrl(request.url);

//     if (urlParsed.length > 0) {
//         let Rest = new REST(db);

//         // Get
//         if (request.method === 'GET') {

//             if (urlParsed.length === 1) {
//                 _responseServer(response, Rest.get().getJson());
//             }
//             else {
//                 _responseServer(response, Rest.get(urlParsed[1]).getJson());
//             }

//         }

//         // Post
//         if (request.method === 'POST') {

//         }
        
//         // Put
//         if (request.method === 'PUT') {

//         }

//         // Delete
//         if (request.method === 'DELETE') {

//         }

//     }
//     else {
//         _404(response);
//     }


//     // switch (request.url) {
//     //     case '/':
//     //         response.statusCode = 200;
//     //         response.setHeader('Content-Type', Constants.jsonHeader);
//     //         response.end('<pre>Hello</pre>');
//     //         break;

//     //     case '/products':
//     //         response.statusCode = 200;
//     //         response.setHeader('Content-Type', Constants.jsonHeader);
//     //         response.end('Hello');
//     //         break;
        
//     //     case '/blog':
//     //         response.statusCode = 200;
//     //         response.setHeader('Content-Type', Constants.jsonHeader);
//     //         response.end('Blog');
//     //         break;

//     //     default:
//     //         _404();
//     //         break;
//     // }
// });

// httpServer.listen(Constants.httpPort, Constants.host, () => {
//     console.log(`Server running at http://${Constants.host}:${Constants.httpPort}/`);
// });

app.listen(Constants.httpPort, () => {
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