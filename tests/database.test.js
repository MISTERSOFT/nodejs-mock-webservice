/**
 * https://mochajs.org/
 * https://github.com/Automattic/expect.js
 */
const expect = require('expect.js');

const Database = require('../database.js');
const Faker = require('faker');
const Product = require('../models/product.js');
const User = require('../models/user.js');

describe('Database', () => {

    const prodId = 'products/1',
          prodTitle = 'Title test',
          prodDesc = 'Description test',
          prodPrice = 10,
          prodColor = 'bleu',
          prodDept = 'Shoes',
          prodMat = 'Plastic',
          prodThb = 'thumb.jpg',
          prodImg = 'image.jpg'
          // user
          userId = 'users/1';
          user = Faker.helpers.userCard();
    user.avatar = Faker.internet.avatar(50, 50);
    delete user.website;
    delete user.company;

    let db = null;


    describe('# new Database()', () => {
        it('should create the database', () => {
            db = new Database();
            expect(db).not.to.equal(null);
        });
    });


    describe('# generateUniqueID()', () => {
        it('should generate a unique ID of type String', () => {
            expect(db.generateUniqueID()).to.be.a('string');
        });
    });


    describe('# add()', () => {
        it('should create a product', () => {
            db.add('products', new Product(
                prodId,
                prodTitle,
                prodDesc,
                prodPrice,
                prodColor,
                prodDept,
                prodMat,
                prodThb,
                prodImg
            )).then((result) => {
                expect(result.ok).to.be(true);
            });
        });

        it('should create a user', () => {
            db.add('users', new User(
                userId,
                user.username,
                user.name,
                user.email,
                user.address,
                user.phone,
                user.avatar
            )).then((result) => {
                expect(result.ok).to.be(true);
            });
        });
    });


    describe('# get()', () => {
        it('should get the product', () => {
            db.get(prodId).then((result) => {
                expect(result).to.have.key('_id').to.eql(prodId);
            });
        });

        it('should get the user', () => {
            db.get(userId).then((result) => {
                expect(result).to.have.key('_id').to.eql(userId);
            });
        });
    });


    describe('# getAll()', () => {
        it('should get all products', () => {
            db.getAll('products').then((result) => {
                expect(result).to.eql(1);
            });
        });

        it('should get all users', () => {
            db.getAll('users').then((result) => {
                expect(result.total_rows).to.eql(1);
            });
        });
    });


    describe('# update()', () => {
        it('should update a product', () => {
            db.update('products', new Product(
                prodId,
                prodTitle,
                prodDesc,
                1000,
                'red',
                prodDept,
                prodMat,
                prodThb,
                prodImg
            )).then((result) => {
                expect(result.ok).to.be(true);

                db.get('products', prodId)
                    .then((result) => {
                        expect(result.price).to.eql(1000);
                        expect(result.color).to.eql('red');
                    });
            });
        });

        it('should update a user', () => {
            db.update('users', new User(
                userId,
                user.username + 'update',
                user.name,
                user.email,
                user.address,
                user.phone,
                user.avatar
            )).then((result) => {
                expect(result.ok).to.be(true);

                db.get('users', userId)
                    .then((result) => {
                        expect(result.username).not.to.eql(user.username);
                    });
            });
        });
    });


    describe('# deleteMockData()', () => {
        it('should destroy the database', () => {
            db.deleteMockData().then((result) => {
                expect(result.ok).to.be(true);
            });
        });
    });

});