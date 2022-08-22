const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is Required'],
    unique: [true, 'same title already exists'],
  },
  size: [{
    type: String,
    required: [true, 'Size is required'],
  }],
  deliveryCharge: {
    type: Number,
    required: [true, 'Delivery charge shoulkd be entered 0 if you do not want to charge']
  },
  price: {
    type: Number,
    reuired: [true, 'price is required']
  },
  productLeft: {
    type: Number,
    required: [true, 'products left are required']
  },
  images: [String],
  by: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: [true, 'Product Owner Is Required']
  },
  buyer: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  rent: String
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;