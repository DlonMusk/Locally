// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User, Store, Product, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        // change this to use context
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate({
                        path: "store",
                        populate: {
                            path: "products",
                            model: "Product",
                        },
                        populate: {
                            path: "reviews",
                            model: "Post",
                        },
                    });

                return user;
            }

            throw new AuthenticationError("You are currently not logged in!");
        },

        getUser: async (_, { _id }) => {
            const user = await User.findOne({ _id: _id });

            if (!user) throw new AuthenticationError("No user found!");

            return user;
        },

        // query to get current users store information for the storefront page
        // make ID optional, if its passed in use it
        getStore: async (parent, args, context) => {
            console.log("ARGS CHECK----------");
            console.log(args._id);
            console.log(context.user._id);
            //console.log(context)
            let store;
            if (args._id) {
                store = await Store.findOne({ _id: args._id }).populate({
                    path: "products",
                    populate: {
                        path: "reviews",
                        model: "Post",
                        populate: {
                            path: "userData",
                            model: "User",
                        },
                    },
                });
            } else {
                store = await Store.findOne({ _id: context._id }).populate({
                    path: "products",
                    populate: {
                        path: "reviews",
                        model: "Post",
                        populate: {
                            path: "userData",
                            model: "User",
                        },
                    },
                });
            }

            if (!store) throw new AuthenticationError("Something went wrong!");

            return store;
        },

        getUserProduct: async (parent, args, context) => {
            let product;
            if (args._id) {

                product = await Product.findOne({ _id: args._id })
                .populate({
                    path: 'reviews',
                        populate: {
                            path: 'userData',
                            model: 'User'
                        }
                    }
                );
            } else {
                product = await Product.findOne({ _id: context._id })
                .populate({
                    path: 'reviews',
                        populate: {
                            path: 'userData',
                            model: 'User'
                        }
                    }
                );
            }

            if (!product) throw new AuthenticationError("Something went wrong!");

            return product;
        },

        getUserPosts: async (parent, args, context) => {
            let user;
            if (args._id) {

                console.log("CHECKING USERPOSTS---------")
                console.log(args._id)
                user = await User.findOne({ _id: args._id })
                .populate({
                        path: 'reviews',
                        model: 'Post',
                        populate: {
                            path: 'destinationId',
                            model: 'Product'
                        }
                    },
                )
            } else {
                user = await User.findOne({ _id: context._id })
                .populate({
                    path: 'reviews',
                    model: 'Post',
                    populate: {
                        path: 'destinationId',
                        model: 'Product'
                    }
                },
            )
            }

            if (!user) throw new AuthenticationError("Something went wrong!");

            return user;
        },

        getStores: async (parent, args) => {
            const stores = await Store.find({}).populate("products");

            if (!stores) throw new AuthenticationError("Something is wrong");

            return stores;
        },

        getProducts: async (parent, args) => {
            let products;
            console.log("IS GET PRODUCTS MAKING IT HERE?")
            console.log(!args)

            if (!args.searchName) {
                console.log("NO ARGS IN HERE?")
                products = await Product.find({})
                .populate({
                    path: 'storeInfo',
                    model: 'Store',
                })
                .populate('tags')

            } else {
                console.log("IS IT IN HERE?")
                products = await Product.find({ productTitle: args.searchName })
                .populate({
                    path: 'storeInfo',
                    model: 'Store',
                })
                .populate('tags')
            }


            if (!products) throw new AuthenticationError("Something is wrong");

            return products;
        },

        getPosts: async (parent, args) => {
            const posts = await Post.find({});

            if (!posts) throw new AuthenticationError("Something went wrong");

            return posts;
        },
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
                throw new AuthenticationError(
                    "Something went wrong! Could not create user."
                );
            }

            const token = signToken(user);


            return { token, user };
        },


        addStore: async (parent, { storeData }, context) => {
            const user = await User.findOne({ _id: context.user._id });

            console.log(user);

            if (!user)
                throw new AuthenticationError(
                    "You must be logged in to create a store"
                );

            const store = await Store.create(storeData)

            await user.update({ store: store._id }, { new: true });

            

            return user;
        },


        //FINAL
        addProduct: async (parent, { productData }, context) => {
            const user = await User.findOne({ _id: context.user._id });

            if (!user)
                throw new AuthenticationError("You must be logged in to add products");


            const product = await Product.create(productData);


            const store = await Store.updateOne(
                { _id: user.store._id },
                { $addToSet: { products: product._id } },
                { new: true }
            );

            if (!store)
                throw new AuthenticationError("You must first create your store");

            return store;
        },

        //FINAL
        removeProduct: async (parent, { productId }, context) => {
            const updatedStore = await Store.findOneAndUpdate(
                { _id: context.user.store._id },
                { $pull: { products: productId } },
                { new: true }
            ).populate("products");

            if (!updatedStore)
                throw new AuthenticationError("Unable to delete product");

            await Product.findOneAndDelete({ _id: productId });

            return updatedStore;
        },

        updateProduct: async (parent, args) => {
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: args.productId },
                { ...args.productData },
                { new: true }
            );

            if (!updatedProduct)
                throw new AuthenticationError("Unable to update product");

            return updatedProduct;
        },

        // LAST TO DO
        //if a user removes a post from there posts it will remove it from the appropriate store
        addPostReview: async (parent, { postReviewData }, context) => {
            // takes in review input and a store or product ID
            console.log({postReviewData})
            console.log(postReviewData.destinationId)
            // get the user making the post
            const user = await User.findOne({ _id: context.user._id });

            if (!user) throw new AuthenticationError("You must be logged in");

            if(!postReviewData.review){
                const post = await Post.create(postReviewData);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { reviews: post._id } },
                    { new: true }
                );
                if (!user) throw new AuthenticationError("You must be logged in");
                return updatedUser;
            }


            const product = await Product.findOne({ _id: postReviewData.destinationId });
            // if none throw error
            if (!product)
                throw new AuthenticationError("No store or product found");
            // create the post
            const post = await Post.create(postReviewData);
            // add the post to the store or product
             if (product) {
                await Product.findOneAndUpdate(
                    { _id: product._id },
                    { $addToSet: { reviews: post._id } },
                    { new: true }
                );
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { reviews: post._id } },
                { new: true }
            );

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

            if (!store && !product)
                throw new AuthenticationError("Something went wrong!");

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
                );
            }

            // delete the post
            await Post.findOneAndDelete({ _id: post._id });

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

        addLike: async (parent, { componentId }, context) => {

            const updatedProduct = Product.findOne({ _id: componentId });
            const updatedPost = Post.findOne({ _id: componentId });

            if (!updatedProduct && !updatedPost) throw new AuthenticationError("Could not add like!");

            if (updatedProduct) {
                const prod = await Product.findOneAndUpdate(
                    { _id: componentId },
                    { $inc: { likes: 1 } },
                    { new: true }
                );
                
            } else if (updatedPost) {
                await Post.findOneAndUpdate(
                    { _id: componentId },
                    { $inc: { likes: 1 } },
                    { new: true }
                )
            }

            return await User.findOne({_id: context.user._id});
        }
    },
};

module.exports = resolvers;
