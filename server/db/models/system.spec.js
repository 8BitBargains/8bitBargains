const {expect} = require('chai');
const db = require('../index');
const System = db.model('system');

describe('System Model Tests ', () => {

  beforeEach('Synchronize and clear database', () => db.sync({force: true}));

  after('Synchronize and clear database', () => db.sync({force: true}));

  describe('System Model', () => {

    // *Assertion translation*:
    // This assertion expects that the System model will
    // put a `name` column in the users table.
    it('has the expected schema definition', () => {
        expect(System.attributes.name).to.be.an('object');
    });

  }); // end describe assertions

  describe('validations', () => {

    it('require title', () => {
      const system = System.build();
      return system.validate()
      .then(() => { throw new Error('Promise should have rejected');})
      .catch(err => {
          expect(err).to.be.an('error');
      });
    });
  }); //end describe validations
}); // end describe('System Model')
