const { Schema, model } = require('mongoose');

const storeSchema = new Schema(
    {
        storeTitle: {
            type: String,
            required: true
        },
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
        tags: [String],
        createdAt: {
            type: Date
        }
    }
);

const Store = model('Store', storeSchema);

module.exports = Store;