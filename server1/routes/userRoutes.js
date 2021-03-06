const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/userController');


router.post('/createUser', usercontroller.createUser);
router.post('/updateData', usercontroller.updateData);
router.get('/allData', usercontroller.getUsers);


module.exports = router;