'use strict';

const Url = require('../../models/Url');

describe('Url model', () => {
  it('should return an error if the url is empty', () => {
    const url = new Url({ id: 1 });

    url.validate().catch((err) => {
      expect(Object.keys(err.errors).length).toBe(1);
      expect(err.errors).toHaveProperty('url');
    });
  });
});
