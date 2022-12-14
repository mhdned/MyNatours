const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      minLength: [2, 'A tour name must have less or equal then 2 characters'],
      maxLength: [80, 'A tour name must have less or equal then 80 characters'],
      // validate: [validator.isAlpha, 'A tour name must be contains character'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a durations'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['very easy', 'easy', 'medium', 'difficult'],
        message: 'Difficulty is either very easy | easy | medium | difficult',
      },
    },
    ratingAvrage: {
      type: Number,
      default: 1,
      min: [0, 'Rating must be above 0'],
      max: [5, 'Rating must be below 5'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only work on new documents
          return val < this.price;
        },
        message: 'Discount Price | {VALUE} | must be lower than price Nigga 👮‍♂️',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a price discount'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a Image'],
    },
    image: String,
    createAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//  DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre('save', function (next) {
  console.log('Will save document');
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});
// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find().where('secretTour').ne(true);
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms`);
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: { $ne: true },
    },
  });
  // console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
