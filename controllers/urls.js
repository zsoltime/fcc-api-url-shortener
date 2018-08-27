'use strict';

const fullUrl = require('requested-url');
const Url = require('../models/Url');

module.exports.create = (req, res, next) => {
  // TODO: Get the API path from somewhere else. It's still too hacky
  const pathToApi = fullUrl(req).replace(/new\/?$/, '');

  Url.create({
    url: req.body.url,
  }).then(
    savedUrl => res.json({
      url: savedUrl.url,
      short_url: `${pathToApi}${savedUrl.id}`,
    }),
    err => next(err)
  );
};

module.exports.get = (req, res, next) => {
  Url.findByShortId(req.params.id).then(
    (doc) => {
      if (doc) {
        return res.redirect(301, doc.url);
      }
      return res.status(404).json({ error: 'Not Found', status: 404 });
    },
    err => next(err)
  );
};
