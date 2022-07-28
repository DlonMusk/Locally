// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {

    Query: {

        me: async (parent, userData) => {

            if (userData) {

                const userData = await User
                    .findOne({ _id: userData._id })
                    .select("-__v -password")

                return userData;
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

            return user;

            
        },
    },
};

module.exports = resolvers;