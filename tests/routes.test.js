'use strict';

const request = require('supertest');

const app = require('../app');

describe('Endpoints', () => {
  describe('GET / ', () => {
    it('should return the documentation', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .then((res) => {
          expect(res.text).toEqual(expect.stringContaining('URL Shortener'));
          done();
        });
    });
  });
});
