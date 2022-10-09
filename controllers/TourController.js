const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const asyncHandler = require('express-async-handler');

exports.getAllTours = asyncHandler(async (req, res, next) => {
  const feature = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const tours = await feature.query;
  res.status(200).json({
    message: 'fetch all data',
    results: tours.length,
    data: { tours },
  });
});

exports.getTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
    message: `fetch data with ID :: { ${req.params.id} }`,
    data: { tour },
  });
});

exports.addTour = asyncHandler(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    message: 'created',
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    upsert: false,
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: 'updated',
    data: { tour },
  });
});

exports.deleteTour = asyncHandler(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

/*<><><>export (methods) App<><><>*/

exports.getTourStats = asyncHandler(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingAvrage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        numRatings: { $sum: '$ratingQuantity' },
        numTour: { $sum: 1 },
        avrageRating: { $avg: '$ratingAverage' },
        avragePrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avragePrice: -1,
      },
    },
    {
      $match: {
        // secretTour: { $ne: true },
        // _id: { $ne: 'easy' },
      },
    },
  ]);
  let temp = 0;
  stats.forEach((el) => (temp += el.numTour));
  res.status(200).json({
    message: 'info',
    result: temp,
    data: stats,
  });
});

exports.getMonthlyPlan = asyncHandler(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: {
          $push: '$name',
        },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        numberTourStarts: -1,
      },
    },
  ]);
  res.status(200).json({
    message: 'info-monthly',
    result: plan.length,
    plan,
  });
});
