'use strict';

const Joi = require('joi');

module.exports.addUrl = {
  body: {
    url: Joi.string()
      .uri({ allowQuerySquareBrackets: true })
      .trim()
      .required()
      .error(errors => ({
        template: 'contains {{amount}} {{word}}: {{codes}}',
        context: {
          codes: errors.map(err => err.toString()).join(', '),
          amount: errors.length,
          word: errors.length === 1 ? 'error' : 'errors',
        },
      })),
  },
};
