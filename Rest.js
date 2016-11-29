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

    //// Methods

    /**
     * GET Http Method
     * @param {string} [id] ID of the product to fetch
     * @returns {Object}    Promise
     */
    get(type, id = null) {
        if (id === null) {
            return this.db.getAll(type)
                .then(this.successPromise)
                .catch(this.errorPromise);
        }
        else {
            return this.db.get(type, type + '/' + id)
                .then(this.successPromise)
                .catch(this.errorPromise);
        }
    }

    /**
     * POST Http Method
     * @param   {Object} product The object of the product to create
     * @returns {Object}         Promise
     */
    post(type, obj = null) {
        obj._id = this.db.generateUniqueID(type);
        return this.db.add(type, obj)
            .then(this.successPromise)
            .catch(this.errorPromise);
    }

    /**
     * PUT Http Method
     * @param   {Object} product  The object of the product to update
     * @returns {Object}          Promise
     */
    put(type, obj) {
        return this.db.update(type, obj)
            .then(this.successPromise)
            .catch(this.errorPromise);
    }

    /**
     * DELETE Http Method
     * @param   {string} id ID of the product to delete
     * @returns {Object}    Promise
     */
    delete(type, id = null) {
        return this.db.delete(type, type + '/' + id)
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