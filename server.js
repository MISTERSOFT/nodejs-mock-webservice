/**
 * Node version : 6.9.1
 */

// Import
const Constants = require('./constants.js');

const express = require('express');
const bodyParser = require('body-parser');
// const http = require('http');
const Database = require('./database.js');
const REST = require('./Rest.js');

// Variables
let app = express();
// let httpServer = null;
let db = new Database();
let Rest = new REST(db);

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
    let text = '10 products has been generated';
    res.end(text);
});

app.get('/generate/:n', (req, res, next) => {
    db.fillDatabaseWithMockData(req.params.n);
    let text = req.params.n + ' products has been generated';
    res.end(text);
});

// Destroy the database
app.get('/destroy', (req, res, next) => {
    db.deleteMockData().then((v) => {
        res.end('Database has been destroyed');
    });
});

/**
 * GET
 */
app.get('/products', (req, res, next) => {
    Rest.get().then((data) => {
        console.log('data ? ', data);
        _responseServer(res, data);
    });
});

app.get('/products/:id', (req, res, next) => {
    Rest.get(req.params.id).then((data) => {
        _responseServer(res, data);
    });
});

/**
 * POST
 */
app.post('/products', (req, res, next) => {
    Rest.post(req.body).then((data) => {
        _responseServer(res, data);
    });
});

/**
 * PUT
 */
app.put('/products', (req, res, next) => {
    Rest.put(req.body).then((data) => {
        _responseServer(res, data);
    });
});

/**
 * DELETE
 */
app.delete('/products/:id', (req, res, next) => {
    Rest.delete('products/' + req.params.id).then((data) => {
        _responseServer(res, data);
    });
});


app.listen(Constants.httpPort, () => {
    console.log(`Server running at http://${Constants.host}:${Constants.httpPort}/`);
});


// Response to Client

function _responseServer(response, data) {
    response
        .status(200)
        .type('json')
        .end(JSON.stringify(data));
}

function _404(response) {
    response
        .status(404)
        .end('404 Not Found');
}