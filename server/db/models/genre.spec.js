const { expect } = require('chai');
const db = require('../index');
const Genre = db.model('genre');

describe('Genre Model Tests ', () => {
  beforeEach('Synchronize and clear database', () => db.sync({ force: true }));

  after('Synchronize and clear database', () => db.sync({ force: true }));

  describe('Genre Model', () => {
    // *Assertion translation*:
    // This assertion expects that the genre model will
    // put a `name` column in the users table.
    it('has the expected schema definition', () => {
      expect(Genre.attributes.name).to.be.an('object');
    });
  }); // end describe assertions

  describe('validations', () => {
    it('require title', () => {
      const genre = Genre.build();
      return genre
        .validate()
        .then(() => {
          throw new Error('Promise should have rejected');
        })
        .catch(err => {
          expect(err).to.be.an('error');
        });
    });
  }); //end describe validations
}); // end describe('Genre Model')
