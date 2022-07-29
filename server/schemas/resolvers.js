// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User, Store, Product, Post } = require("../models");
const { signToken } = require("../utils/auth");
const { ObjectId } = require('mongoose').Types;

const resolvers = {

    Query: {
        // change this to use context
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

        // query to get current users store information for the storefront page
        // make ID optional, if its passed in use it
        getUserStore: async (parent, args, context) => {
            let store;
            if (args._id) {
                store = await Store.findOne({ _id: args._id })
                    .populate('products');
            } else {
                store = await Store.findOne({ _id: context._id })
                    .populate('products');
            }


            return store;
        },


        getUserProduct: async (parent, args, context) => {
            let product;
            if (args._id) {
                product = await Product.findOne({ _id: args._id })
            } else {
                product = await Product.findOne({ _id: context._id })
            }

            return product;
        },

        getStores: async (parent, args) => {
            const stores = await Store.find({}).populate('products');

            if (!stores) throw new AuthenticationError("Something is wrong")

            return stores;
        },

        getProducts: async (parent, args) => {
            const products = await Product.find({});

            if (!products) throw new AuthenticationError("Something is wrong");

            return products;
        },

        getPosts: async (parent, args) => {
            const posts = await Post.find({});

            if (!posts) throw new AuthenticationError("Something went wrong");

            return posts;
        }


    },

    Mutation: {

        login: async (parent, userData) => {

        },

        addUser: async (parent, userData) => {

            const user = await User.create(userData);

            if (!user) {
                throw new AuthenticationError("Didnt work");
            }

            // add store to user
            const store = await Store.create({ email: userData.email })
            await user.update({ store: store._id }, { new: true });

            return user;
        },

        // change this to use context
        addProduct: async (parent, productData) => {

            const user = await User.findOne({ _id: productData._id });
            
            if(!user) throw new AuthenticationError("You must be logged in to add products");

            const product = await Product.create(productData.productData);

            await Store.updateOne(
                {_id: user.store._id}, 
                { $addToSet: { products: product._id } },
                {new: true}
                );

            return user;

        },

        
        removeProduct: async (parent, { productId, storeId }) => {

                const updatedStore = await Store.findOneAndUpdate(
                    { _id: storeId },
                    { $pull: { products: productId } },
                    { new: true },
                ).populate('products')

                await Product.findOneAndDelete({_id: productId});

                console.log(updatedStore)

                if(!updatedStore) throw new AuthenticationError("Unable to delete product");

                return updatedStore;
        },

        updateProduct: async (parent, args ) => {

            console.log(args.productData)
           const updatedProduct = await Product.findOneAndUpdate(
            {_id: args.productId},
            {...args.productData},
            {new: true}
            );

            console.log(updatedProduct);

            if(!updatedProduct) throw new AuthenticationError("Unable to update product");

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