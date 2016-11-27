# nodejs-mock-webservice

## Presentation
This API allow you to access mock data. You have to test you code with some data via an API but you don't have any network ? You can download this on [Github](https://github.com/MISTERSOFT/nodejs-mock-webservice) !
All returning data are in JSON.

## Pre-requisites
* [Install NodeJS](https://nodejs.org/en/) - (Use a version of NodeJS that allow ES6 Javascript)
* Run "npm install" - To install all dependencies

## How to use
You can access to the API via these URLs bellow using Http request method :

* ## GET
    * /generate
    Generate 10 products by default. If you run the server, this going to create a database directly.
    * /generate/{n}
    Generate N products.
    Exemple : http://localhost:3001/generate/6
    * /destroy
    Destroy the database. Erase everything and database itself.
    * /products
    Fetch all products
    * /products/{id}
    Fetch product by its ID
    Exemple : http://localhost:3001/products/80ekywaf
    Return :
    ```json
    {
        "success":true,
        "result": {
            "title": "Product number 1", 
            "description": "Description of product 1",
            "price": "1.60",
            "_id":"products/80ekywafg",
            "_rev":"1-2a387c1924a3451f50e2205438e5aa06"
        }
    }
    ```
* ## POST
    * /products
    Create a product into the database.
    Model use for product :
    ```javascript
    {
        _id = null,
        title = 'Your title',
        description = 'Your description',
        price = 12.5
    }
    ```
* ## PUT
    * /products
    Update a product into the database.
    Model use for product :
    ```javascript
    {
        _id = '80ekywaf',
        title = 'Your title updated',
        description = 'Your description updated',
        price = 116.1,
        _rev: '1-2a387c1924a3451f50e2205438e5aa06'
    }
    ```
* ## DELETE
    * /products/{id}
    Delete a product into the database.
    Exemple : http://localhost:3001/products/80ekywaf

## Others
* Returned values
    * Successful request
    ```json
    {
        success: true,
        result: {}
    }
    ```
    * Failed request
    ```json
    {
        success: false,
        message: 'error text'
        error: {}
    }
    ```
* Server run on port 3001, change the port in the "contants.js" file if you need.