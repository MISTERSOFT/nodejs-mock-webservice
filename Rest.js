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
    get(type, id = null) {
        if (id === null) {
            return this.db.getAll(type)
                .then(this.successPromise)
                .catch(this.errorPromise);
        }
        else {
            return this.db.get(type + '/' + id)
                .then(this.successPromise)
                .catch(this.errorPromise);
        }
    }

    /**
     * POST Http Method
     * @param   {Object} product The object of the product to create
     * @returns {Object}
     */
    post(type, obj = null) {
        obj._id = this.db.generateUniqueID();
        return this.db.add(type, obj)
            .then(this.successPromise)
            .catch(this.errorPromise);
    }

    /**
     * PUT Http Method
     * @param   {Object} product  The object of the product to update
     * @returns {Object}
     */
    put(type, product) {
        return this.db.update(type, product)
            .then(this.successPromise)
            .catch(this.errorPromise);
    }

    /**
     * DELETE Http Method
     * @param   {string} id ID of the product to delete
     * @returns {Object}
     */
    delete(type, id = null) {
        return this.db.deletet(type, id)
            .then(this.successPromise)
            .catch(this.errorPromise);
    }


    //// Promise methods

    successPromise(data) {
        return {
            success: true,
            result: data
        };
    }

    errorPromise(error) {
        return error;
    }

}