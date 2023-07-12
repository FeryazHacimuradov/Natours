const express = require('express');
const { signup, login } = require('./../controllers/authController');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');
const { protect } = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(protect, getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
