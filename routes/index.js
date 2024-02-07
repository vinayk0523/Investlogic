const express = require('express');
const { signController , loginController} = require('../controller/index');
const router = express.Router();

router.post('/signup', signController);
router.post('/login',loginController);
module.exports = router;


