/*<><><>Tours Route<><><>*/
const express = require('express');
const TourController = require('./../controllers/TourController');
const {
  getAllTours,
  addTour,
  getTour,
  updateTour,
  deleteTour,
} = require('./../controllers/TourController');
const { topFiveCheap } = require('./../middleware/AggregateTours');

const router = express.Router();

router.route('/top-5-cheap').get(topFiveCheap, TourController.getAllTours);
router.route('/info').get(TourController.getTourStats);
router.route('/info-monthly/:year').get(TourController.getMonthlyPlan);

router.route('/').get(TourController.getAllTours).post(TourController.addTour);
router
  .route('/:id')
  .get(getTour)
  .patch(TourController.updateTour)
  .delete(TourController.deleteTour);

module.exports = router;
