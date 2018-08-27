'use strict';

const Joi = require('joi');

module.exports.addUrl = {
  body: {
    url: Joi.string()
      .uri({ allowQuerySquareBrackets: true })
      .trim()
      .required(),
  },
};
