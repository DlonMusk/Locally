// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User, Store, Product, Post } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
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
                )
                .populate({
                    path: 'storeInfo',
                    model: 'Store'
                })

            } else {
                product = await Product.findOne({ _id: context._id })
                    .populate({
                        path: 'reviews',
                        populate: {
                            path: 'userData',
                            model: 'User'
                        }
                    }
                )
                .populate({
                    path: 'storeInfo',
                    model: 'Store'
                })

            }

            if (!product) throw new AuthenticationError("Something went wrong!");

            return product;
        },

        getUserPosts: async (parent, args, context) => {
            let user;
            if (args._id) {

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

        getProducts: async (parent, { searchName, tagState }) => {


            const searchRegex = new RegExp(searchName, 'gi');

            let products = await Product.find({})
                .populate({
                    path: 'storeInfo',
                    model: 'Store',
                })
                .populate('tags')


            if (!products) throw new AuthenticationError("No products in the database");

            products = products.filter(product => product.productTitle.match(searchRegex));


            if(tagState === 'All'){
               return products
            }

            products = products.filter(product => product.tags.includes(tagState))
            return products
        },

        getPosts: async (parent, args) => {
            const posts = await Post.find({});

            if (!posts) throw new AuthenticationError("Something went wrong");

            return posts;
        },

        getUserByStore: async (parent, args) => {
            const user = await User.findOne({ store: args._id});

            if (!user) throw new AuthenticationError("Something went wrong");

            return user;
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


            if (!user)
                throw new AuthenticationError(
                    "You must be logged in to create a store"
                );

            const store = await Store.create(storeData)

            await user.update({ store: store._id }, { new: true });



            return user;
        },

        updateStore: async (parent, args) => {
            const updatedStore = await Store.findOne({ _id: args._id });
            console.log(updatedStore)

            if (!updatedStore) {
                throw new AuthenticationError("Unable to update store");
            }

            await updatedStore.update({
                storeTitle: args.storeData.storeTitle,
                email: args.storeData.email,
                address: args.storeData.address,
                phoneNumber: args.storeData.phoneNumber,
            
            }, { new: true });

            return updatedStore;
        },

        removeStore: async(parent, {storeId}) => {
            // find store to remove
            // go through each post and delete it from the database
            // remove the store from the database

            const storeToDelete = await Store.findOne({_id: storeId});

            console.log(storeToDelete);
            console.log(storeToDelete.reviews.length);

            const storeReviews = storeToDelete.reviews;

            const storeProducts = storeToDelete.products;

            if(storeReviews){
                for(let i = 0; i < storeReviews.length; i++){
                    const deleted = await Post.findOneAndDelete({_id: storeReviews[i]._id})
                    console.log(deleted);
                    if(!deleted) throw new AuthenticationError("Could not delete post")
                }
            } else throw new AuthenticationError("No reviews");

            if(storeProducts){
                for(let i = 0; i < storeProducts.length; i++){
                    const product = storeProducts[i];

                    for(let j = 0; j < product.reviews.length; j++){
                        const deletedProductReview = await Post.findOneAndDelete({_id: product.reviews[j]._id})
                        if(!deletedProductReview) throw new AuthenticationError("could not delete post")
                    }

                    await Product.findOneAndDelete({_id: product._id});
                }
            }
            

            const deletedStore = await Store.findOneAndDelete({_id: storeId});
            if(!deletedStore) throw new AuthenticationError("No store was deleted");

            return deletedStore;
        },


        
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
            const updatedProduct = await Product.findOne({ _id: args._id });
            console.log(updatedProduct)
            console.log("STORE INFO-------------")
            console.log(args.productData.storeInfo)

            if (!updatedProduct) {
                throw new AuthenticationError("Unable to update product");
            }
            console.log("CHECKING ARGS FOR UPDATE PRODUCT")
            console.log(args)

            await updatedProduct.update({
                productTitle: args.productData.productTitle,
                productDescription: args.productData.productDescription,
                productPrice: args.productData.productPrice,
                productImage: args.productData.productImage,
                stock: args.productData.stock,
                tags: args.productData.tags,
                storeInfo: args.productData.storeInfo
            
            }, { new: true });

            return updatedProduct;
        },

        // LAST TO DO
        //if a user removes a post from there posts it will remove it from the appropriate store
        addPostReview: async (parent, { postReviewData }, context) => {
            // takes in review input and a store or product ID
            // get the user making the post
            const user = await User.findOne({ _id: context.user._id });

            if (!user) throw new AuthenticationError("You must be logged in");

            if (!postReviewData.review) {
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
                await Product.findOneAndUpdate(
                    { _id: componentId },
                    { $inc: { likes: 1 } },
                    { new: true }
                );
                
            }   if (updatedPost) {

                await Post.findOneAndUpdate(
                    { _id: componentId },
                    { $inc: { likes: 1 } },
                    { new: true }
                )
            }

            return await User.findOne({ _id: context.user._id });
        }
    },
};

module.exports = resolvers;
