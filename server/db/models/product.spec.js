const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product Model Tests ', () => {

  beforeEach('Synchronize and clear database', () => db.sync({force: true}));

  after('Synchronize and clear database', () => db.sync({force: true}));

  describe('Product model', () => {

    // *Assertion translation*:
    // This assertion expects that the Product model will
    // put an `title` column in the users table.
    it('has the expected schema definition', () => {
        expect(Product.attributes.title).to.be.an('object');
    });

    // This assertion expects that the Product model will
    // put a `description` column in the users table.
    it('has the expected schema definition', () => {
      expect(Product.attributes.description).to.be.an('object');
    });

      // This assertion expects that the Product model will
    // put a `price` column in the users table.
    it('has the expected schema definition', () => {
      expect(Product.attributes.price).to.be.an('object');
    });

    });

  describe('validations', () => {

    it('allows an empty coverUrl', () => {
        // .build creates an instance of a model
        // without saving the represented data to the database.
        const product = Product.build();
        expect(product.coverUrl).to.be.equal(undefined);
    });

    it('require title', () => {
      const product = Product.build({
        price: 500,
        description: 'It is a great game',
        inventory: 5
      });
      return product.validate()
      .then(() => { throw new Error('Promise should have rejected');})
      .catch(err => {
          expect(err).to.be.an('error');
      });
    });

    it('require price', () => {
      const product = Product.build({
        title: 'The best Game Ever',
        description: 'It is a great game',
        inventory: 5
      });
      return product.validate()
      .then(() => { throw new Error('Promise should have rejected');})
      .catch(err => {
          expect(err).to.be.an('error');
      });
    });

    it('require description', () => {
      const product = Product.build({
        title: 'The best Game Ever',
        price: 500,
        inventory: 5
      });
      return product.validate()
      .then(() => { throw new Error('Promise should have rejected');})
      .catch(err => {
          expect(err).to.be.an('error');
      });
    });
  }); // end describe('Product Model')
}); // end describe('Product model')
