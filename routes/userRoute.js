// userRoute.js (or wherever your routes are defined)
const express = require('express');
const { createUser, getUsers, logoutUser, loginUser } = require('../controllers/Usercontrollers');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/alluser').get(getUsers);
router.route('/loginuser').post(loginUser);
router.route('/userLogout/:id').get(logoutUser);

module.exports = router;
