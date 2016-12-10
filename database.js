const PouchDB = require('pouchdb');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Faker = require('faker');
const Constants = require('./constants.js');

// let database = new PouchDB('market');

module.exports = class Database {

    constructor() {
        this.database = new PouchDB('market');
    }

    /**
     * Fill the database with some mock data
     */
    fillDatabaseWithMockData(howManyProduct) {
        this.hasDatabase();
        var i = 0;
        for(i; i < howManyProduct; i++) {

            let fakeUser = Faker.helpers.userCard();
            fakeUser.avatar = Faker.internet.avatar(50, 50);
            delete fakeUser.website;
            delete fakeUser.company;

            let randomPic = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

            this.add(
                Constants.typeProduct,
                new Product(
                    this.generateUniqueID(Constants.typeProduct),
                    Faker.commerce.product(),
                    Faker.lorem.sentence(20),
                    Faker.commerce.price(),
                    Faker.commerce.color(),
                    Faker.commerce.department(),
                    Faker.commerce.productMaterial(),
                    Faker.image.food(200, 100) + '/' + randomPic,
                    Faker.image.food(800, 400) + '/' + randomPic
                )
            );

            this.add(
                Constants.typeUser,
                new User(
                    this.generateUniqueID(Constants.typeUser),
                    fakeUser.username,
                    fakeUser.name,
                    fakeUser.email,
                    fakeUser.address,
                    fakeUser.phone,
                    fakeUser.avatar
                )
            );
        }
    }

    /**
     * Generate unique ID
     */
    generateUniqueID(type) {
        return type + '/' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Delete database
     * Call this function is you want to reset all data
     */
    deleteMockData() {

        return this.database.destroy().then((response) => {

            if (response.ok) {
                this.database = null;
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
     * @param {string} type Type of doc products/users
     * @param {object} obj  Object to add
     */
    add(type, obj) {

        this.hasDatabase();

        return this.database.put(obj).then((result) => {

            if (result.ok) {
                console.log( type + ' successfully added ! With ID : ' + result.id);
                return Promise.resolve(result);
            }
            
        }).catch((error) => {

            console.log('Error happened, the ' + type + ' couln\'t be added !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, the ' + type + ' couln\'t be added !',
                error: error
            });
        });

    }


    /**
     * Update product into database
     * @param {string} type     Type of doc product or user
     * @param {object} object   Contain the new value of the product/user
     */
    update(type, obj) {

        this.hasDatabase();

        let insert = {};

        if (type === Constants.typeUser) {
            insert = {
                _id: obj._id,
                _rev: obj._rev,
                username: obj.username,
                name: obj.name,
                email: obj.email,
                address: obj.address,
                phone: obj.phone,
                avatar: obj.avatar
            };
        }

        if (type === Constants.typeProduct) {
            insert = {
                _id: obj._id,
                _rev: obj._rev,
                title: obj.title,
                description: obj.description,
                price: obj.price,
                color: obj.color,
                department: obj.department,
                material: obj.material,
                thumb: obj.thumb,
                image: obj.image
            };
        }

        return this.database.put(insert).then((result) => {
            if (result.ok) {
                console.log(type + ' successfully updated !', result);
                return Promise.resolve(result);
            }
        }).catch((error) => {

            console.log('Error happened, ' + type + ' couln\'t be updated !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, ' + type + ' couln\'t be updated !',
                error: error
            });
        });

    }


    /**
     * Delete a product into the database
     * @param {string} type Type of doc products/users
     * @param {string} id   Doc ID
     */
    delete(type, id) {

        this.hasDatabase();

        return this.database.get(id).then((doc) => {

            return this.database.remove(doc);

        }).then((result) => {

            if (result.ok) {
                console.log(type + ' successfully deleted !', result);
                return Promise.resolve(result);
            }

        }).catch((error) => {

            console.log('Error happened, ' + type + ' couln\'t be deleted !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, ' + type + ' couln\'t be deleted !',
                error: error
            });
        });

    }


    /**
     * Fetch a product from the database
     * @param {string} type Type of doc products/users
     * @param {string} id   Doc ID
     */
    get(type, id) {

        this.hasDatabase();

        return this.database.get(id).then((doc) => {

            if (doc) {
                console.log(type + ' successfully fetched !', doc);
                return Promise.resolve(doc);
            }

        }).catch((error) => {

            console.log('Error happened, ' + type + ' couln\'t be fetched !', error);
            return Promise.reject({
                success: false,
                message: 'Error happened, ' + type + ' couln\'t be fetched !',
                error: error
            });
        });

    }


    /**
     * Fetch all doc from the database by type
     */
    getAll(type) {

        this.hasDatabase();

        return this.database.allDocs({

            include_docs: true,
            startkey: type,
            endkey: type + '\uffff'

        }).then((result) => {
            
            console.log(type + ' successfully fetched !', result);

            let data = [];
            for (var i in result.rows) {
                data.push(result.rows[i].doc);
            }
            return new Promise((resolve, reject) => {
                resolve(data);
            });

        }).catch((error) => {

            console.log('Error happened, ' + type + ' couln\'t be fetched !', error);
            return Promise.reject(error);
        });

    }

    /**
     * Check if the database is created
     */
    hasDatabase() {
        if (this.database === null) {
            this.database = new PouchDB('market');
        }
    }

}