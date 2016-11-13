const PouchDB = require('pouchdb');
const Product = require('./models/product.js');

let database = new PouchDB('market');

module.exports = class Database {

    constructor() { }

    /**
     * Fill the database with some mock data
     */
    fillDatabaseWithMockData (howManyProduct) {
        var i = 0;
        for(i; i < howManyProduct; i++) {
            let price = (Math.random() * ( (i + 1) - i) + i).toFixed(2);
            this.addProduct(new Product(this.generateUniqueID(), `Product number ${i}`, `Description of product ${i}`, price));
        }
    }

    /**
     * Generate unique ID
     */
    generateUniqueID () {
        return 'products/' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Delete database
     * Call this function is you want to reset all data
     */
    freshMockData () {

        database.destroy().then((response) => {

            if (response.ok) {
                console.log('*************************************');
                console.log('* Database successfully destroyed ! *');
                console.log('*************************************');
            }

        }).catch((error) => {

            console.log('********************************************************');
            console.log('* Error happened, the database couln\'t be destroyed ! *');
            console.log('********************************************************');

        });

    }


    /**
     * Add product into database
     * @param product object Product to add
     */
    addProduct (product) {

        //product._id = 'products/' + Date.now(); // Product Id generated

        database.put(product).then((result) => {

            if (result.ok) {
                console.log('Product successfully added ! With ID : ' + result.id);
                // todo : return JSON success
            }
            
        }).catch((error) => {

            console.log('Error happened, the product couln\'t be added !', error);
            // todo : return JSON error

        });

    }


    /**
     * Update product into database
     * @param id        string  Product ID
     * @param product   object  Contain the new value of the product  
     */
    updateProduct (id, product) {

        database.get(id).then((doc) => {

            return database.put({
                _id: id,
                _rev: doc._rev,
                title: product.title || doc.title,
                price: product.price || doc.price,
                description: product.description || doc.description
            });

        }).then((result) => {

            if (result.ok) {
                console.log('Product successfully updated !', result);
                // todo : return JSON success
            }

        }).catch((error) => {

            console.log('Error happened, the product couln\'t be updated !', error);
            // todo : return JSON error

        });

    }


    /**
     * Delete a product into the database
     * @param id string Product ID
     */
    deleteProduct (id) {

        database.get(id).then((doc) => {

            return database.remove(doc);

        }).then((result) => {

            if (result.ok) {
                console.log('Product successfully deleted !', result);
                // todo : return JSON success
            }

        }).catch((error) => {

            console.log('Error happened, the product couln\'t be deleted !', error);
            // todo : return JSON error
            
        });

    }


    /**
     * Fetch a product from the database
     * @param id string Product ID
     */
    getProduct (id) {

        database.get(id).then((doc) => {

            if (doc) {
                console.log('Product successfully fetched !', doc);
                // todo : return JSON success
            }

        }).catch((error) => {

            console.log('Error happened, the product couln\'t be fetched !', error);
            // todo : return JSON error

        });

    }


    /**
     * Fetch all products from the database
     */
    getAllProducts () {

        database.allDocs({

            include_docs: true

        }).then((result) => {
            
            console.log('Products successfully fetched !', result);
            // todo : return JSON success

        }).catch((error) => {

            console.log('Error happened, products couln\'t be fetched !', error);
            // todo : return JSON error

        });

    }

}