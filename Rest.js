module.exports = class REST {

    /**
     * RESTful API Methods
     * @constructor
     * @param {Object} database Database to request
     */
    constructor(database) {
        this.json = {};
        this.db = database;
    }

    ////

    getJson() {
        return JSON.stringify(this.json);
    }


    //// Methods

    /**
     * GET Http Method
     * @param {string} [id] ID of the product to fetch
     * @returns {Object}
     */
    get(id = null) {
        if (id === null) {
            this.db.getAllProducts()
                .then(this.successPromise)
                .catch(this.errorPromise);
        }
        else {
            this.db.getProduct(id)
                .then(this.successPromise)
                .catch(this.errorPromise);
        }
        return this;
    }

    /**
     * POST Http Method
     * @param {Object} product The object of the product to create
     * @returns {Object}
     */
    post(product = null) {
        // if (product !== null) {
        this.db.addProduct(product)
            .then(this.successPromise)
            .catch(this.errorPromise);
        // }
        return this;
    }

    /**
     * PUT Http Method
     * @param {string} id       ID of the product to update
     * @param {Object} product  The object of the product to update
     * @returns {Object}
     */
    put(id, product) {
        // if (id !== null && product !== null) {
        this.db.updateProduct(id, product)
            .then(this.successPromise)
            .catch(this.errorPromise);
        // }
        return this;
    }

    /**
     * DELETE Http Method
     * @param {string} id ID of the product to delete
     * @returns {Object}
     */
    delete(id = null) {
        // if (id !== null) {
        this.db.deleteProduct(id)
            .then(this.successPromise)
            .catch(this.errorPromise);
        // }
        return this;
    }


    //// Promise methods

    successPromise(data) {
        this.json = {
            success: true,
            result: data
        };
        return json;
    }

    errorPromise(error) {
        this.json = error;
        return json;
    }

}