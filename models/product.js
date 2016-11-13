module.exports = class Product {
    constructor(id, _title, _desc, _price) {
        this._id = id; //'products/' + Date.now().toString(); // Product Id generated
        this.title = _title;
        this.description = _desc;
        this.price = _price;
    }
}