const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
	productTitle: {
		type: String,
		required: true,
		unique: true
	},
	productDescription: {
		type: String,
		minlength: 10,
		maxlength: 200,
	},
	productPrice: {
		type: Number,
	},
	productImage: {
		type: String,
	},
	stock: {
		type: Number,
	},
	likes: {
		type: Number,
		default: 0
	},
	Tags: {
		type: [String],
	},
});

const Product = model('Product', productSchema);

module.exports = Product;
