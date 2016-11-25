const PouchDB = require('pouchdb');
const Product = require('./models/product.js');

// let database = new PouchDB('market');

module.exports = class Database {

    constructor() {
        this.database = new PouchDB('market');
    }

    /**
     * Fill the database with some mock data
     */
    fillDatabaseWithMockData (howManyProduct) {
        var i = 0;
        for(i; i < howManyProduct; i++) {
            let price = (Math.random() * ( (i + 1) - i) + i).toFixed(2);
            this.addProduct(
                new Product(
                    this.generateUniqueID(),
                    'Product number ' + i,
                    'Description of product ' + i,
                    price
                )
            );
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
    deleteMockData () {

        return this.database.destroy().then((response) => {

            if (response.ok) {
                console.log('*************************************');
                console.log('* Database successfully destroyed ! *');
                console.log('*************************************');
                return Promise.resolve(response);
            }

        }).catch((error) => {

            console.log('********************************************************');
            console.log('* Error happened, the database couln\'t be destroyed ! *');
            console.log('********************************************************');

        });

    }


    /**
     * Add product into database
     * @param {object} product Product to add
     */
    addProduct (product) {

        //product._id = 'products/' + Date.now(); // Product Id generated

        return this.database.put(product).then((result) => {

            if (result.ok) {
                console.log('Product successfully added ! With ID : ' + result.id);
                // todo : return JSON success
                return Promise.resolve(result);
            }
            
        }).catch((error) => {

            console.log('Error happened, the product couln\'t be added !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, the product couln\'t be added !',
                error: error
            });
        });

    }


    /**
     * Update product into database
     * @param {string} id       Product ID
     * @param {object} product  Contain the new value of the product  
     */
    updateProduct (id, product) {

        return this.database.get(id).then((doc) => {

            return this.database.put({
                _id: id,
                _rev: doc._rev,
                title: product.title || doc.title,
                price: product.price || doc.price,
                description: product.description || doc.description
            });

        }).then((result) => {

            if (result.ok) {
                console.log('Product successfully updated !', result);
                return Promise.resolve(result);
            }

        }).catch((error) => {

            console.log('Error happened, the product couln\'t be updated !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, the product couln\'t be updated !',
                error: error
            });
        });

    }


    /**
     * Delete a product into the database
     * @param {string} id Product ID
     */
    deleteProduct (id) {

        return this.database.get(id).then((doc) => {

            return this.database.remove(doc);

        }).then((result) => {

            if (result.ok) {
                console.log('Product successfully deleted !', result);
                return Promise.resolve(result);
            }

        }).catch((error) => {

            console.log('Error happened, the product couln\'t be deleted !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, the product couln\'t be deleted !',
                error: error
            });
        });

    }


    /**
     * Fetch a product from the database
     * @param {string} id Product ID
     */
    getProduct (id) {

        return this.database.get(id).then((doc) => {

            if (doc) {
                console.log('Product successfully fetched !', doc);
                return Promise.resolve(doc);
            }

        }).catch((error) => {

            console.log('Error happened, the product couln\'t be fetched !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, the product couln\'t be fetched !',
                error: error
            });
        });

    }


    /**
     * Fetch all products from the database
     */
    getAllProducts () {

        return this.database.allDocs({

            include_docs: true

        }).then((result) => {
            
            console.log('Products successfully fetched !', result);
            return new Promise((resolve, reject) => {
                resolve(result);
            });

        }).catch((error) => {

            console.log('Error happened, products couln\'t be fetched !', error);
            // return Promise.reject(error);
        });

    }

}