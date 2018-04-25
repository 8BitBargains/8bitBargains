const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');

describe('Order Model Tests ', () => {
  beforeEach('Synchronize and clear database', () => db.sync({ force: true }));

  after('Synchronize and clear database', () => db.sync({ force: true }));

  describe('Order Model', () => {
    // *Assertion translation*:
    // This assertion expects that the Order model will
    // put an `address` column in the users table.
    it('has the expected schema definition', () => {
      expect(Order.attributes.address).to.be.an('object');
    });

    // This assertion expects that the Order model will
    // put a `sessionId` column in the users table.
    it('has the expected schema definition', () => {
      expect(Order.attributes.sessionId).to.be.an('object');
    });

    // This assertion expects that the Order model will
    // put a `status` column in the users table.
    it('has the expected schema definition', () => {
      expect(Order.attributes.status).to.be.an('object');
    });
  });

  describe('validations', () => {
    it('defaults status to "Created"', () => {
      // .build creates an instance of a model
      // without saving the represented data to the database.
      const order = Order.build();
      expect(order.status).to.be.equal('Created');
    });
  }); // end describe('Order Model')
});
