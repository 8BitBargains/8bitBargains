import { expect } from 'chai';

import { getGenres } from '.';

describe('getGenres', () => {
  it('gets the genres', () => {
    const genres = ['Action', 'Adventure', 'Platformer'];

    expect(getGenres(genres)).to.be.deep.equal({
      type: 'GET_GENRES',
      genres: genres
    });
  });
});
