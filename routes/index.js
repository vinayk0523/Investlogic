const express = require('express');
const { signController , loginController, homeController, policyController, pdfController} = require('../controller/index');
const { verifyToken } = require('../middleware/middleware');
const router = express.Router();

router.post('/signup', signController);
router.post('/login',loginController);
router.get('/getdata',verifyToken,homeController);

router.get('/getPolicyData',policyController)

router.get('/getPdf',pdfController)

module.exports = router;


