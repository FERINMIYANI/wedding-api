const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email Is Required'],
        unique: [true, 'The Same Email Adress Already Exists']
    },
    password: {
        type: String,
        required: [true, 'The Password Is Required']
    }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;