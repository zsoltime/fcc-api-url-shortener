# API Project: freeCodeCamp URL Shortener [![Build Status](https://img.shields.io/travis/zsoltime/fcc-api-url-shortener.svg?style=flat-square)](https://travis-ci.org/zsoltime/fcc-api-url-shortener)

This is my entry for [freeCodeCamp's third "APIs & Microservices" project][fcc-link]. Demo is available on [my site][demo]. You can also check out [my other freeCodeCamp projects][projects].

## User Stories

- [ ] I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{ "original_url": "www.google.com","short_url": 1 }`
- [ ] If I pass an invalid URL that doesn't follow the `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{ "error": "invalid URL" }`. HINT: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
- [ ] When I visit the shortened URL, it will redirect me to my original link.

## Example Usage

```
// TODO
```

### Example Output

```json
{
  "original_url": "www.google.com",
  "short_url": 1
}
```

## API Endpoints

| Method | Route | Description |
|:---:|:---| :---|
| POST | /api/shorturl/new | Create a short URL |
| GET | /:id | Redirects to the original URL |

## Tools Used

- [ESLint](https://github.com/eslint/eslint) linter with Airbnb's [base config](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [Express.js](https://github.com/expressjs/express) framework
- [Jest](https://github.com/facebook/jest) test framework
- [Pug](https://github.com/pugjs/pug) template engine
- [Supertest](https://github.com/visionmedia/supertest/) library

## Install and Build

#### Clone this repo

```bash
git clone https://github.com/zsoltime/fcc-api-url-shortener.git
cd fcc-api-url-shortener
```

#### Install dependencies

```bash
npm install
```

#### Start dev server

It starts a dev server, monitor for changes and restarts on any change.

```bash
npm run dev
```

#### Start

It starts the node.js application.

```bash
npm start
```

#### Run tests

It runs tests using Jest and Supertest.

```bash
npm test
```

[demo]: https://zsolti.me/apis/url-shortener
[fcc-link]: https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice
[projects]: https://github.com/zsoltime/freeCodeCamp
