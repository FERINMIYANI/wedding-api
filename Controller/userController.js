let User = require('../Model/User')
let Product = require('../Model/Product')

exports.createUser = async function (req, res, next) {
    try {
        let data = { ...req.body }
        data.status = true
        if (!data) {
            throw new Error('Data Not Found')
        }
        let details = await User.create(data)
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

exports.updateUser = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        if (!data || !id) {
            throw new Error('Data or Id Not Found')
        }
        let details = await User.findByIdAndUpdate(id, { $set: data })
        if (!details) {
            throw new Error("Incorrect Id")
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

exports.deleteUser = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error("ID Was Not Found")
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'User Delete success'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.user = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        let details = await User.findById(id)
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

exports.buyProduct = async function (req, res, next) {
    try {
        let id = req.query.id
        let productId = req.query.productId
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        let userDetails = await User.findByIdAndUpdate(id, { $push: { 'order': productId } })
        let productDetails = await Product.findByIdAndUpdate(productId, { $push: { 'buyer': id } })
        if (!userDetails || !productDetails) {
            throw new Error("Something Went Wrong")
        }
        return res.status(200).json({
            message: 'Product added to cart'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async function (req, res, next) {
    try {
        let id = req.query.id
        let productId = req.query.productId
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        let userDetails = await User.findByIdAndUpdate(id, { $pull: { 'orders': productId } })
        let productDetails = await Product.findByIdAndUpdate(productId, { $pull: { buyer: { _id: productId } } })
        if (!userDetails || !productDetails) {
            throw new Error("Something Went Wrong")
        }
        return res.status(200).json({
            message: 'Product deleted'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.updateProduct = async function (req, res, next) {
    try {
        let id = req.query.id
        let productId = req.query.productId
        let data = { ...req.body }
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        await User.findByIdAndUpdate(id, { $pull: { 'orders': productId } })
        await Product.findByIdAndUpdate(productId, { $set: { 'buyer.$[a]': data } }, { "arrayFilters": [{ 'a._id': productId }] })
        return res.status(200).json({
            message: 'Product updated'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}