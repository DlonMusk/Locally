const { Schema, model } = require('mongoose');


const postSchema = new Schema(
    {
        postContent: {
            type: String
        },
        likes: {
            type: Number,
            default: 0
        },
        review: {
            type: Boolean
        },
        destinationId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        userData: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;
