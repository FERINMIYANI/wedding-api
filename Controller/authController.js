let Seller = require('../Model/Seller')
let User = require('../Model/User')
var jwt = require('jsonwebtoken');

exports.userLogin = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await User.findOne({ 'email': data.email })
        if (!details) {
            throw new Error("Incorrect Email")
        }
        if (details.password != data.password) {
            throw new Error("Incorrect password")
        }
        let token = jwt.sign({ _id: details._id }, 'user');
        return res.status(200).json({
            message: 'login success',
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.sellerLogin = async function (req, res, next) {
    try {
        let data = { ...req.body }
        let details = await Seller.findOne({ 'email': data.email })
        if (!details) {
            throw new Error("Incorrect Email")
        }
        if (details.password != data.password) {
            throw new Error("Incorrect password")
        }
        let token = jwt.sign({ _id: details._id }, 'seller');
        return res.status(200).json({
            message: 'login success',
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.protectSeller = async function(req, res, next){
    try {
        let token = req.headers.auth
        if(!token){
            throw new Error("Token not Found")
        }
        let verified = jwt.verify(token, 'seller');
        if(!verified){
            throw new Error("Token Incorrect")
        }
        req.headers.id = verified._id
        next()
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}