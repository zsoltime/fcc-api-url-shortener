'use strict';

const Counter = require('../../models/Counter');

describe('Counter model', () => {
  it('should return an error if the _id field is empty', () => {
    const counter = new Counter();

    counter.validate().catch((err) => {
      expect(Object.keys(err.errors).length).toBe(1);
      expect(err.errors._id).toBeDefined();
    });
  });

  it('should have a default seq of 1', () => {
    const counter = new Counter({ _id: 'urls' });

    expect(counter.seq).toBe(1);
  });
});
