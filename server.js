/**
 * Node version : 6.9.1
 */

/* START */
console.log('Please wait...');

// Import
const Constants = require('./constants.js');

const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./database.js');
const REST = require('./Rest.js');
const Faker = require('faker');
// console.log('Fake ', Faker.address.streetAddress());
// console.log('Fake ', Faker.address.streetName());
// console.log('Fake ', Faker.address.city());
// console.log('Fake ', Faker.address.zipCode());
// console.log('Fake ', Faker.address.country());
// console.log('----');
// console.log('Fake ', Faker.helpers.userCard());
// Variables
let app = express();
let db = new Database();
let Rest = new REST(db);

// Init http server
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});


/***************************
 * GET
 **************************/
app.get('/', (req, res, next) => {
    res.render('index.html');
});

/*********** FEED & DESTROY THE DATABASE ***********/

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


/*********** FETCH ALL OR ONE PRODUCT/USER ***********/

// Products
app.get('/products', (req, res, next) => {
    Rest.get(Constants.typeProduct).then((data) => {
        console.log('data ? ', data);
        _responseServer(res, data);
    });
});

app.get('/products/:id', (req, res, next) => {
    Rest.get(Constants.typeProduct, req.params.id).then((data) => {
        _responseServer(res, data);
    });
});

// Users
app.get('/users', (req, res, next) => {
    Rest.get(Constants.typeUser).then((data) => {
        console.log('data ? ', data);
        _responseServer(res, data);
    });
});

app.get('/users/:id', (req, res, next) => {
    Rest.get(Constants.typeUser, req.params.id).then((data) => {
        _responseServer(res, data);
    });
});


/**************************
 * POST
 **************************/
app.post('/products', (req, res, next) => {
    Rest.post(Constants.typeProduct, req.body).then((data) => {
        _responseServer(res, data);
    });
});

app.post('/users', (req, res, next) => {
    Rest.post(Constants.typeUser, req.body).then((data) => {
        _responseServer(res, data);
    });
});

/*************************
 * PUT
 ************************/
app.put('/products', (req, res, next) => {
    Rest.put(Constants.typeProduct, req.body).then((data) => {
        _responseServer(res, data);
    });
});

app.put('/users', (req, res, next) => {
    Rest.put(Constants.typeUser, req.body).then((data) => {
        _responseServer(res, data);
    });
});

/*************************
 * DELETE
 *************************/
app.delete('/products/:id', (req, res, next) => {
    Rest.delete(Constants.typeProduct, req.params.id).then((data) => {
        _responseServer(res, data);
    });
});

app.delete('/users/:id', (req, res, next) => {
    Rest.delete(Constants.typeUser, req.params.id).then((data) => {
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