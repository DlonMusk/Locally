// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User, Store } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {

        me: async (parent, userData) => {

            if (userData) {
                const user = await User
                    .findOne({ _id: userData._id })
                    .select("-__v -password")

                return user;
            };

            throw new AuthenticationError("User doesnt exist");
        },
    },

    Mutation: {

        addUser: async (parent, userData) => {
            
            const user = await User.create(userData);

            if(!user){
                throw new AuthenticationError("Didnt work");
            }

            // add store to user
            const store = await Store.create({email: userData.email})
            user.store = store;

            return user;
        },

    
    },
};

module.exports = resolvers;