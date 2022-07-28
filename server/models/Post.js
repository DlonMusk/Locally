const { Schema, model } = require('mongoose');


const postSchema = new Schema(
    {
        postContent: {
            type: String
        },
        likes: {
            type: Number
        },
        review: {
            type: Boolean
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;
