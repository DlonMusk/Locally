const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
	productTitle: {
		type: String,
		required: true,
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
	},
	Tags: {
		type: [String],
	},
});

module.exports = productSchema;
