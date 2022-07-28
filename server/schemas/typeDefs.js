// Setting up file requirements
const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        store: ID
        reviews: [Reviews]
    }

    type Store {
        storeId: ID!
        products: [Products]
        rating: Int
        reviews: [Reviews]
        address: String
        email: String
        phoneNumber: String
        tags: [String]
    }

`;

// Exporting module so it can be used in other files
module.exports = typeDefs;