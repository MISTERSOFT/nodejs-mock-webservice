/**
 * https://mochajs.org/
 * https://github.com/Automattic/expect.js
 */
const expect = require('expect.js');

const Database = require('../database.js');
const Product = require('../models/product.js')

describe('Database', () => {

    const prodID = 1,
          prodTitle = 'Title test',
          prodDesc = 'Description test',
          prodPrice = 10;

    let db = null;


    describe('# new Database()', () => {
        it('should create the database', () => {
            db = new Database();
            expect(db).not.to.equal(undefined);
        });
    });


    describe('# generateUniqueID()', () => {
        it('should generate a unique ID of type String', () => {
            expect(db.generateUniqueID()).to.be.a('string');
        });
        it('should generate a unique ID of length = 18', () => {
            expect(db.generateUniqueID()).to.have.length(18);
        });
    });


    describe('# addProduct()', () => {
        it('should create mock data', () => {
            db.addProduct(new Product(
                prodID,
                prodTitle,
                prodDesc,
                prodPrice
            )).then((result) => {
                expect(result.ok).to.be(true);
            });
        });
    });


    describe('# getProduct()', () => {
        it('should get the product', () => {
            db.getProduct(prodID).then((result) => {
                expect(result).to.have.key('_id').to.eql(prodID);
            });
        });
    });


    describe('# getAllProducts()', () => {
        it('should get all products', () => {
            db.getAllProducts().then((result) => {
                expect(result).to.have.key('total_rows');
            });
        });
    });


    describe('# updateProduct()', () => {
        it('should update a product', () => {
            db.updateProduct(new Product(
                prodID,
                'update title !',
                'update description !',
                103
            )).then((result) => {
                expect(result.ok).to.be(true);
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