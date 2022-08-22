var express = require('express');
var router = express.Router();
let adminController = require('../Controller/adminController')

/* GET home page. */
router.post('/addadmin', adminController.addAdmin);


router.get('/allseller', adminController.allSeller);
router.post('/updateseller', adminController.updateSeller);
router.post('/deleteseller', adminController.deleteSeller);

router.get('/allusers', adminController.allUsers)
router.post('/deleteUser', adminController.deleteUser)
router.post('/updateUser', adminController.updateUser)


module.exports = router;
