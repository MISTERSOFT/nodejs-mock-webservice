# nodejs-mock-webservice

## Presentation
This API allow you to access mock data. You have to test you code with some data via an API but you don't have any network ? You can download this on [Github](https://github.com/MISTERSOFT/nodejs-mock-webservice) !
All returned data are in JSON.

## Pre-requisites
* [Install NodeJS](https://nodejs.org/en/) - (Use a version of NodeJS that allow ES6 Javascript)
* Run "npm install" - To install all dependencies

## How to use
You can access to the API via these URLs bellow using Http request methods :

* GET
    * /generate
    
    Generate 10 products by default. If you run the server, this going to create a database directly.
    
    * /generate/{n}
    
    Generate N products.
    
    _Exemple : http://localhost:3001/generate/6_
    
    * /destroy
    
    Destroy the database. Erase everything and database itself.
    
    * /products
    
    Fetch all products
    
    * /products/{id}
    
    Fetch product by its ID
    
    _Exemple : http://localhost:3001/products/80ekywaf_

    * /users
    
    Fetch all users
    
    * /users/{id}
    
    Fetch users by its ID
    
    _Exemple : http://localhost:3001/users/80ekywag_

* POST
    * /products
    
    Create a product into the database.
    
    Model use for product :
    ```javascript
    {
        _id = null,
        title = 'Your title',
        description = 'Your description',
        price = 12.5,
        color = 'red',
        department = 'Food',
        material = 'Organic',
        thumb = 'thumb.jpg',
        image = 'image.jpg'
    }
    ```

    * /users
    
    Create a user into the database.
    
    Model use for user :
    ```javascript
    {
        _id = null,
        username = 'BadBoy',
        name = 'Jean Bean',
        email = 'jean.bean@email.fr',
        address = {
            street = 'Groove Street',
            suite = 'My Home',
            city = 'Los Santos',
            zipcode = '11111',
            geo = {
                lat = '1.5415857',
                lng = '1.541918'
            }
        },
        phone = 'XXXXXXXXXXXXXX',
        avatar = 'avatar.jpg'
    }
    ```
* PUT
    * /products
    
    Update a product into the database.
    
    Model use for product :
    ```javascript
    {
        _id = '80ekywaf',
        title = 'Your title updated',
        description = 'Your description updated',
        price = 11,
        color = 'bleu',
        department = 'Food',
        material = 'Vegetal',
        thumb = 'thumb_2.jpg',
        image = 'image.jpg'
        _rev: '1-2a387c1924a3451f50e2205438e5aa06'
    }
    ```

    * /users
    
    Update a user into the database.
    
    Model use for user :
    ```javascript
    {
        _id = 'users/80ekywag',
        _rev: '1-2a387c1924a3451f50e2205438e5aa09',
        username = 'BadBoy1234',
        name = 'Jean Bean',
        email = 'jean.bean@gmail.fr',
        address = {
            street = 'Groove Street',
            suite = 'My Home',
            city = 'Los Santos',
            zipcode = '11111',
            geo = {
                lat = '1.5415857',
                lng = '1.541918'
            }
        },
        phone = 'XXXXXXXXXXXXXX',
        avatar = 'avatar_132.jpg'
    }
    ```
* DELETE
    * /products/{id}
    
    Delete a product into the database.
    
    _Exemple : http://localhost:3001/products/80ekywaf_

    * /users/{id}
    
    Delete a users into the database.
    
    _Exemple : http://localhost:3001/products/80ekywag_

## Others
* Returned values
    * Successful request
    ```json
    {
        "success": true,
        "result": {}
    }
    ```
    * Failed request
    ```json
    {
        "success": false,
        "message": "error text",
        "error": {}
    }
    ```
* Server run on port 3001, change the port in the "contants.js" file if you need.
