let Product = require('../Model/Product')
const Seller = require('../Model/Seller')
const User = require('../Model/User')

exports.addProduct = async function (req, res, nect) {
    try {
        let data = { ...req.body }
        let details = await Product.create(data)
        let sellerDetails = await Seller.findByIdAndUpdate(data.by, { $push: { 'products': details._id } })
        if (!details || !sellerDetails) {
            throw new Error("Something Went Wrong")
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

exports.updateProduct = async function (req, res, nect) {
    try {
        let data = { ...req.body }
        let id = req.query.id
        if (!id) {
            throw new Error("Id Not Found")
        }
        let details = await Product.findByIdAndUpdate(id, data)
        if (!details) {
            throw new Error("Not Updated")
        }
        return res.status(200).json({
            message: 'Product was Updated'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async function (req, res, nect) {
    try {
        let updateId = req.query.id
        let id = req.headers.id
        if (!id) {
            throw new Error("Id Not Found")
        }
        await Product.findByIdAndDelete(updateId)
        await Seller.findByIdAndUpdate(id, {$pull: {'products': updateId}})
        return res.status(200).json({
            message: 'Product was Deleted'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.product = async function (req, res, nect) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error("Id Not Found")
        }
        let details = await Product.findById(id).populate('buyer')
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

exports.updateImage = async function (req, res, nect) {
    try {
        let id = req.query.id
        let data = { ...req.body }
            let photoArray = []
            if(data.photos){
                photoArray = data.photos
            }
        if (req.files.images && photoArray) {
            req.files.images.map((e) => {
                photoArray.push(e.filename)
            })
        }
        if (photoArray.length >= 5) {
            throw new Error("You cannot add more then 5 images")
        }
        await Product.findByIdAndUpdate(id, { $set: { images: photoArray } })
        return res.status(200).json({
            message: 'images were added to product'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.cancelOrder = async (req, res, next) => {
    try {
        let userId = req.query.userId
        let productId = req.query.productId

        if(!userId || !productId){
            throw new Error("Data Was Not Found")
        }       
        let userDetails = await User.findByIdAndUpdate(userId, {$pull: {'order': productId}})
        let productDetails = await Product.findByIdAndUpdate(productId, {$pull: {'buyer':userId}})
        if(!userDetails || !productDetails){
            throw new Error("Wrong UserId or ProductId")
        }
        return res.status(200).json({
            message: 'Order Canceld SuccessFully'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}