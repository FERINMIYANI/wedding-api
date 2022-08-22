let Seller = require('../Model/Seller')

exports.addSeller = async function (req, res, next) {
    try {
        let data = { ...req.body }
        data.status = true
        let details = await Seller.create(data)
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
        if (!id) {
            throw new Error("Id Not Found")
        }
        let details = await Seller.findByIdAndUpdate(id, { $set: data })
        if (!details) {
            throw new Error('Id Was Wrong')
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


exports.deleteSeller = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        if (!id) {
            throw new Error("Id Not Found")
        }
        let details = await Seller.findByIdAndUpdate(id, { $set: data })
        if (!details) {
            throw new Error('Id Was Wrong')
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

exports.seller = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error("Id Was Not Found")
        }
        let details = await Seller.findById(id).populate('products').populate({
            path: 'products',
            populate: {
                path: 'buyer'
            }
        })
        if (!details) {
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

// exports.login = async function (req, res, next) {
//     try {
//         let data = { ...req.body }
//         let details = await Seller.findOne({ email: data.email })
//         if (!details) {
//             throw new Error("Email Incorrect")
//         }
//         if (details.password != data.password) {
//             throw new Error("Incorrect Password")
//         }
//         return res.status(200).json({
//             message: 'login Success'
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(404).json({
//             message: error.message
//         })
//     }
// }