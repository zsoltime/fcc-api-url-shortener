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

urlSchema.statics.findByShortId = function findByShortId(id) {
  return this.findOne({ id });
};

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
