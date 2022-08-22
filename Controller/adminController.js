let Admin = require('../Model/Admin')
let Seller = require('../Model/Seller')
let Product = require('../Model/Product')
let User = require('../Model/User')

exports.addAdmin = async function (req, res, next) {
    try {
        let data = { ...req.body }
        if (!data) {
            throw new Error("Data Not Found")
        }
        let details = await Admin.create(data)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allSeller = async function (req, res, next) {
    try {
        let details = await Seller.find()
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updateSeller = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        if (!data) {
            throw new Error("Data Not Found")
        }
        let details = await Seller.findByIdAndUpdate(id, { $set: data })
        if (!details) {
            throw new Error("Id Incorrect")
        }
        return res.status(200).json({
            message: 'update Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteSeller = async function (req, res, next) {
    try {
        let id = req.query.id
        let details = await Seller.findByIdAndUpdate(id, { status: req.body.value })
        if (!details) {
            throw new Error("Id Incorrect")
        }
        return res.status(200).json({
            message: 'Delete Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allUsers = async function (req, res, next) {
    try {
        let details = await User.find()
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteUser = async function (req, res, next) {
    try {
        let id = req.query.id
        if(!id){
            throw new Error("Id Was Not Found")
        }
        let details = await User.findByIdAndUpdate(id, {status: req.body.value})
        if(!details){
            throw new Error("Incorrect ID")
        }
        return res.status(200).json({
            message: 'Delete Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updateUser = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = {...req.body}
        if(!id){
            throw new Error("Id Was Not Found")
        }
        let details = await User.findByIdAndUpdate(id, {$set: data})
        if(!details){
            throw new Error("Incorrect ID")
        }
        return res.status(200).json({
            message: 'Update Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allProducts = async function(req, res, next){
    try {
        let details = await Product.find()
        if(!details){
            throw new Error("Details Not Found")
        }
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}