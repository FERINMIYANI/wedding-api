const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email Is Required'],
    unique: [true, 'The Same Email Already Exists']
  },
  mobile: {
    type: Number,
    required: [true, 'mobile number is required'],
    unique: [true, 'the same mobile number already exists']
  },
  password: {
    type: String,
    requried: [true, "Password is Required"]
  },
  status: {
    type: Boolean,
    required: [true, 'Status Is Required']
  },
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  address: {
    type: String,
    required: [true, 'address is required']
  },
  likes: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;