var express = require('express');
var router = express.Router();
let userController = require('../Controller/userController')

/* GET users listing. */
router.post('/createuser', userController.createUser);
router.get('/deleteuser', userController.deleteUser);
router.post('/updateuser', userController.updateUser);
router.get('/user', userController.user);

router.get('/buyProduct', userController.buyProduct);
router.get('/deleteproduct', userController.deleteProduct)
router.post('/updateProduct', userController.updateProduct)

module.exports = router;