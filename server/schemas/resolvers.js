// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User, Store, Product, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {
        // change this to use context
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User
                    .findOne({ _id: context.user._id })
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

            throw new AuthenticationError("You are currently not logged in!");
        },

        getUser: async (_, { _id }) => {
            const user = await User.findOne(_id);

            if (!user) throw new AuthenticationError("No user found!");

            return user;
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

            if (!store) throw new AuthenticationError("Something went wrong!")

            return store;
        },


        getUserProduct: async (parent, args, context) => {
            let product;
            if (args._id) {
                product = await Product.findOne({ _id: args._id })
            } else {
                product = await Product.findOne({ _id: context._id })
            }

            if (!product) throw new AuthenticationError("Something went wrong!")

            return product;
        },

        getUserPosts: async (parent, args, context) => {
            let user;
            if (args._id) {
                user = await User.findOne({ _id: args._id })
            } else {
                user = await User.findOne({ _id: context._id })
            }

            if (!user) throw new AuthenticationError("Something went wrong!")

            return user.posts;
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

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Wrong password!");
            }

            const token = signToken(user);

            return { token, user };
        },

        addUser: async (parent, userData) => {
            // email password

            const user = await User.create(userData);

            if (!user) {
                throw new AuthenticationError("Something went wrong! Could not create user.");
            }

            const token = signToken(user);

            return { token, user };
        },

        addUserStore: async (parent, storeData, context) => {
            const user = await User.findOne({ _id: context.user._id });

            if (!user) throw new AuthenticationError("You must be logged in to create a store");

            const store = await Store.create(storeData)
            await user.update({ store: store._id }, { new: true });

            return user;
        },

        //FINAL
        addProduct: async (parent, productData, context) => {

            const user = await User.findOne({ _id: context.user._id });

            if (!user) throw new AuthenticationError("You must be logged in to add products");

            const product = await Product.create(productData);

            const store = await Store.updateOne(
                { _id: user.store._id },
                { $addToSet: { products: product._id } },
                { new: true }
            );

            if (!store) throw new AuthenticationError("You must first create your store");

            return store;

        },

        //FINAL
        removeProduct: async (parent, { productId }, context) => {

            const updatedStore = await Store.findOneAndUpdate(
                { _id: context.user.store._id },
                { $pull: { products: productId } },
                { new: true },
            ).populate('products');

            if (!updatedStore) throw new AuthenticationError("Unable to delete product");

            await Product.findOneAndDelete({ _id: productId });

            return updatedStore;
        },

        updateProduct: async (parent, args) => {

            const updatedProduct = await Product.findOneAndUpdate(
                { _id: args.productId },
                { ...args.productData },
                { new: true }
            );

            if (!updatedProduct) throw new AuthenticationError("Unable to update product");

            return updatedProduct;
        },




        // LAST TO DO
        //if a user removes a post from there posts it will remove it from the appropriate store
        addPostReview: async (parent, { destinationId, postData }, context) => {

            // takes in review input and a store or product ID

            // get the user making the post
            const user = await User.findOne({ _id: context.user._id });

            if (!user) throw new AuthenticationError("You must be logged in");



            // find a store with the ID
            const store = await Store.findOne({ _id: destinationId })
            // if no store find a product with the ID
            const product = await Product.findOne({ _id: destinationId });
            // if none throw error
            if (!store && !product) throw new AuthenticationError("No store or product found");
            // create the post
            const post = await Post.create(postData);
            // add the post to the store or product
            if (store) {
                await Store.findOneAndUpdate(
                    { _id: store._id },
                    { $addToSet: { reviews: post } },
                    { new: true }
                );
            } else if (product) {
                await Product.findOneAndUpdate(
                    { _id: product._id },
                    { $addToSet: { reviews: post } },
                    { new: true }
                )
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { posts: post } },
                { new: true }
            )

            return updatedUser;
        },

        // removes a post not a review from the users posts
        removePostReview: async (parent, { postId }, context) => {

            // removes the post from the user
            const user = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { posts: postId } },
                { new: true }
            );

            if (!user) throw new AuthenticationError("Must be logged in");




            // gets the post data
            const post = await Post.findOne({ _id: postId });

            if (!post) throw new AuthenticationError("could not find post");





            // find the store or product the post is attached to
            const store = await Store.findOne({ _id: post.destinationId });

            const product = await Product.findOne({ _id: post.destinationId });

            if (!store && !product) throw new AuthenticationError("Something went wrong!");



            // remove the post from the store or product it is attached to
            if (store) {
                await Store.findOneAndUpdate(
                    { _id: store._id },
                    { $pull: { reviews: postId } },
                    { new: true }
                );
            } else if (product) {
                await Product.findOneAndUpdate(
                    { _id: product._id },
                    { $pull: { reviews: postId } },
                    { new: true }
                )
            }


            // delete the post
            await Post.findOneAndDelete({ _id: post._id })

            return user;

        },

        // Add update Post/Review here later
        updatePostReview: async (parent, postData) => {
            const updatedPost = Post.findOneAndUpdate(
                { _id: postData._id },
                { ...postData },
                { new: true }
            );

            if (!updatedPost) throw new AuthenticationError("Unable to update post!");

            return updatedPost;
        },
    },
};

module.exports = resolvers;