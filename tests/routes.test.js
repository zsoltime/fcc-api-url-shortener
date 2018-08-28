'use strict';

const request = require('supertest');

const app = require('../app');
const Counter = require('../models/Counter');
const Url = require('../models/Url');

const wipeCollections = models => Promise.all(models.map(model => model.remove({})));

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

  describe('POST /api/shorturl/new', () => {
    afterEach(async () => {
      jest.restoreAllMocks();
      await wipeCollections([Counter, Url]);
    });

    it('should return the original and short URL after saved to the database', (done) => {
      const urlToShorten = 'https://example.com/test/path?i=4';

      request(app)
        .post('/api/shorturl/new')
        .send({ url: urlToShorten })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(
            expect.objectContaining({
              url: urlToShorten,
              short_url: expect.stringMatching(/\/api\/shorturl\/[\d]+/),
            })
          );
          done();
        });
    });

    it('should return Internal Server Error if Mongoose fails to save', (done) => {
      jest
        .spyOn(Url, 'create')
        // eslint-disable-next-line prefer-promise-reject-errors
        .mockImplementation(() => Promise.reject({}));

      const urlToShorten = 'https://example.com/test/path?i=4';

      request(app)
        .post('/api/shorturl/new')
        .send({ url: urlToShorten })
        .expect('Content-Type', /json/)
        .expect(500)
        .then((res) => {
          expect(res.body.status).toBe(500);
          expect(res.body.message).toBe('Internal Server Error');
          done();
        });
    });

    it('should return Bad Request if URL is missing', (done) => {
      request(app)
        .post('/api/shorturl/new')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) => {
          expect(res.body.status).toBe(400);
          expect(res.body.message).toMatch(/"url" is required/i);
          done();
        });
    });

    it('should return Bad Request if URL is not a valid URL', (done) => {
      const urlToShorten = 'invalidUrl/test';

      request(app)
        .post('/api/shorturl/new')
        .send({ url: urlToShorten })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) => {
          expect(res.body.status).toBe(400);
          expect(res.body.message).toMatch(/"url" must be a valid uri/i);
          done();
        });
    });

    it('should return Bad Request if URL is valid, but DNS lookup fails', (done) => {
      const urlToShorten = 'http://thisisavalidurl.eu/404-page';

      request(app)
        .post('/api/shorturl/new')
        .send({ url: urlToShorten })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) => {
          expect(res.body.status).toBe(400);
          expect(res.body.message).toBe('Invalid hostname');
          done();
        });
    });
  });

  describe('GET /api/shorturl/:id', () => {
    let insertedUrl = null;

    beforeAll(async () => {
      insertedUrl = await new Url({ url: 'https://google.co.uk' }).save();
    });

    afterAll(async () => {
      await wipeCollections([Counter, Url]);
    });

    it('should redirect to the original link saved to the database with :id', (done) => {
      request(app)
        .get(`/api/shorturl/${insertedUrl.id}`)
        .expect(301)
        .expect('Location', insertedUrl.url, done);
    });

    it('should return Not Found if :id is not found in the database', (done) => {
      request(app)
        .get('/api/shorturl/0')
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.status).toBe(404);
          expect(res.body.message).toBe('Not Found');
          done();
        });
    });

    it('should return Not Found if :id is not a number', (done) => {
      request(app)
        .get('/api/shorturl/invalidId')
        .expect(404)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.status).toBe(404);
          expect(res.body.message).toBe('Not Found');
          done();
        });
    });
  });
});
