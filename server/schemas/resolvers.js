// Setting up file requirements
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, { email, password }) => {
			if (userData) {
				const userData = await User.findOne({ email }).select("-__v -password");

				return userData;
			}

			throw new AuthenticationError("User doesnt exist");
		},
	},

	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
		},
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });

			return user;
		},
	},
};

module.exports = resolvers;
