module.exports = class User {
    constructor(id, _username, _name, _email, _addr, _phone, _avatar) {
        this._id = id;
        this.username = _username;
        this.name = _name;
        this.email = _email;
        this.address = _addr;
        this.phone = _phone;
        this.avatar = _avatar;
    }
}