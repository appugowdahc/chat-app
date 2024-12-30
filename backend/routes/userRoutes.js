const express = require('express');
const {registerUser,authUser} = require('../controllers/userControllers')
const {upload} = require('../utils/uploadS3')
const router  = express.Router();

router.route('/signup').post(upload.single('picture'),registerUser);


router.route('/login').post(authUser);

module.exports = router;