/*<><><>Users Route<><><>*/
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./../controllers/UserControlller');
const { signUp, logginUser } = require('./../controllers/AuthController');

const router = express.Router();
router.param('id', (req, res, next, val) => {
  console.log(`user ID is ==> ${val}`);
  next();
});

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.post('/signup', signUp);
router.post('/loggin', logginUser);

module.exports = router;
