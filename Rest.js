module.exports = class REST {

    /**
     * RESTful API Methods
     * @constructor
     * @param {Object} database Database to request
     */
    constructor(database) {
        this.json = null;
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
        let that = this;
        if (id === null) {
            this.db.getAllProducts()
                .then(this.successPromise.bind(that))
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
        let that = this;
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
        let that = this;
        // if (id !== null && product !== null) {
        this.db.updateProduct(id, product)
            .then(this.successPromise)
            .catch((err) => {
                this.json = {
                    success: false,
                    error: err
                };
                return this.json;
            });
        // }
        return this;
    }

    /**
     * DELETE Http Method
     * @param {string} id ID of the product to delete
     * @returns {Object}
     */
    delete(id = null) {
        let that = this;
        // if (id !== null) {
        this.db.deleteProduct(id)
            .then(this.successPromise)
            .catch(this.errorPromise);
        // }
        return this;
    }


    //// Promise methods

    successPromise(data) {
        that.json = {
            success: true,
            result: data
        };
        return this.json;
    }

    errorPromise(error) {
        that.json = {
            success: false,
            error: error
        };
        return this.json;
    }

}