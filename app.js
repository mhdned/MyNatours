/*<><><>Config App<><><>*/
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

/*<><><>MiddleWare App<><><>*/
// // // // console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
/*<><><>Load Static Files App<><><>*/
app.use(express.static(path.join(__dirname, '/public')));
/*<><><>Body App<><><>*/

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/*<><><>Route App<><><>*/
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/*<><><>MiddleWare App<><><>*/
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

/*<><><>404 MW App<><><>*/
app.all('*', (req, res, next) => {
  const err = new Error(`Not found ${req.originalUrl} page | 404 ⛔`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

/*<><><>Listen App<><><>*/
module.exports = app;
