module.exports = class Product {
    constructor(id, _title, _desc, _price, _color, _department, _material, _thumb, _image) {
        this._id = id;
        this.title = _title;
        this.description = _desc;
        this.price = _price;
        this.color= _color;
        this.department = _department;
        this.material = _material;
        this.thumb = _thumb;
        this.image = _image;
    }
}