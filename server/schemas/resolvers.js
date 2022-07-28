// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User, Store, Product, Post } = require("../models");
const { signToken } = require("../utils/auth");
const { ObjectId } = require('mongoose').Types;

const resolvers = {
	Query: {
		me: async (parent, { email, password }) => {
			if (userData) {
				const userData = await User.findOne({ email }).select("-__v -password");

				return userData;
			}

        me: async (parent, userData) => {
            if (userData) {
                const user = await User
                    .findOne({ _id: userData._id })
                    .select("-__v -password")
                    .populate({
                        path: 'store',
                        populate: {
                            path: 'products',
                            model: 'Product'
                        }
                    })
                    .populate({
                        path: 'store',
                        populate: {
                            path: 'reviews',
                            model: 'Post'
                        }
                    })

                return user;
            };

            throw new AuthenticationError("User doesnt exist");
        },
    },
}

    Mutation: {

        login: async(parent, userData) => {

        },

        addUser: async (parent, userData) => {
            
            const user = await User.create(userData);

            if(!user){
                throw new AuthenticationError("Didnt work");
            }

            // add store to user
            const store = await Store.create({email: userData.email})
            await user.update({store: store._id},{new: true});

            return user;
        },

        addProduct: async (parent, productData) => {

            const user = await User.findOne({_id: productData._id});

            const store = await Store.findOne({_id: user.store._id});

            
            
            if (productData) {
                const product = await Product.create(productData.productData);

                await store.update({$addToSet: {products: product._id}})

                return user;
            }

            throw new AuthenticationError("Unable to add Product");
        },

        removeProduct: async (parent, { productID }) => {

            if (productID) {
                const updatedProduct = await Store.findOneAndUpdate(
                    { _id: productID },
                    { $pull: { products: { productID } } },
                    { new: true },
                )

                return updatedProduct;
            };

            throw new AuthenticationError("Unable to delete Product");

        },

        updateProduct: async (_, { productID, productTitle, productDescription, productPrice, productImage, productStock, productTags }) => { 
            const updatedProduct = await Store.findOneAndUpdate(products, { _id: productID }); 
            if (!updatedProduct) {
                throw new AuthenticationError("Unable to update Product");
            }
            updatedProduct.productTitle = productTitle;
            updatedProduct.productDescription = productDescription;
            updatedProduct.ProductPrice = productPrice;
            updatedProduct.ProductImage = productImage;
            updatedProduct.stock = productStock;
            updatedProduct.tags = productTags;

            return updatedProduct;
        },

        addPostReview: async (parent, postReviewData) => {
            
            if (postReviewData) {
                const postReview = await Post.create(postReviewData)

                return postReview;
            }

            throw new AuthenticationError("Unable to add Post/Review");
        },

        removePostReview: async (parent, { postReviewID }) => {

            if (postReviewID) {
                const updatedPostReview = await User.findOneAndUpdate(
                    { _id: postReviewID },
                    { $pull: { reviews: { postReviewID } } },
                    { new: true },
                )

                return updatedPostReview;
            };

            throw new AuthenticationError("Unable to delete Post/Review");

        },

        // // Add update Post/Review here later
        // updatePostReview: async (_, { productID, productTitle, productDescription, productPrice, productImage, productStock, productTags }) => { 
        //     const updatedProduct = await Store.findOneAndUpdate(products, { _id: productID }); 
        //     if (!updatedProduct) {
        //         throw new AuthenticationError("Unable to update Product");
        //     }
        //     updatedProduct.productTitle = productTitle;
        //     updatedProduct.productDescription = productDescription;
        //     updatedProduct.ProductPrice = productPrice;
        //     updatedProduct.ProductImage = productImage;
        //     updatedProduct.stock = productStock;
        //     updatedProduct.tags = productTags;

        //     return updatedProduct;
        // },
    },
};

module.exports = resolvers;
