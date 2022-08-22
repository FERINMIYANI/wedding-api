var express = require('express');
var router = express.Router();
let sellerController = require('../Controller/sellerController')
let productController = require('../Controller/productController')
let authController = require('../Controller/authController')
let multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* GET home page. */

router.post('/login', authController.sellerLogin)

router.post('/addseller', authController.protectSeller, sellerController.addSeller);
router.post('/updateseller', authController.protectSeller, sellerController.updateSeller)
router.get('/deleteseller', authController.protectSeller, sellerController.deleteSeller)
router.get('/seller', authController.protectSeller, sellerController.seller)


router.post('/addproduct', authController.protectSeller, productController.addProduct)
router.post('/updateproduct', authController.protectSeller, productController.updateProduct)
router.post('/updateimage', authController.protectSeller, upload.fields([{ name: 'images', maxCount: 5 }]), productController.updateImage)
router.get('/deleteproduct', authController.protectSeller, productController.deleteProduct)
router.get('/product', authController.protectSeller, productController.product)
router.get('/cancelorder', authController.protectSeller, productController.cancelOrder)


module.exports = router;