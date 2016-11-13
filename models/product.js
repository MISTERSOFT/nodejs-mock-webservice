module.exports = class Product {
    constructor(id, _title, _desc, _price) {
        this._id = id;
        this.title = _title;
        this.description = _desc;
        this.price = _price;
    }
}