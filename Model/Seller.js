const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  address: {
    type: String,
    required: [true, 'Company address is required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: [true, 'The same Email already Exists']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  companyOwner: {
    type: String,
    required: [true, 'Company owner Name is required']
  },
  mobile: {
    type: Number,
    required: [true, 'Mobile number is required'],
    unique: [true, 'The same Mobile number already exists']
  },
  status: {
    type: Boolean,
    required: [true, 'Status Is Required']
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;