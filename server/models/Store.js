const { Schema, model } = require('mongoose');

const storeSchema = new Schema(
    {
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }
        ],
        rating: {
            type: Number
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        address: {
            type: String
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        tags: [String]
    }
);

const Store = model('Store', storeSchema);

module.exports = Store;