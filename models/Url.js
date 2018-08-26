'use strict';

const mongoose = require('mongoose');

const Counter = require('./Counter');

const urlSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

urlSchema.query.byId = function byId(id) {
  return this.find({ id });
};

urlSchema.virtual('short_url').get(function getShortUrl() {
  // TODO: Use site URL instead of the hardcoded one
  return `http://localhost:3030/${this.id}`;
});

urlSchema.pre('save', function incrementCounter(next) {
  Counter.findOneAndUpdate(
    { _id: 'urlId' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true },
    (err, { seq }) => {
      if (err) {
        return next(err);
      }
      this.id = seq;
      return next();
    }
  );
});

module.exports = mongoose.model('Url', urlSchema);
