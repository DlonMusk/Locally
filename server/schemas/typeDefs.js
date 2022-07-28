// Setting up file requirements
const { gql } = require("apollo-server-express");


const typeDefs = gql`
    scalar Date

    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        store: Store
        reviews: [Post]
    }

    type Store {
        _id: ID!
        products: [Product]
        rating: Int
        reviews: [Post]
        address: String
        email: String
        phoneNumber: String
        tags: [String]
        createdAt: Date
    }

    type Product {
        _id: ID!
        productTitle: String!
        productDescription: String
        ProductPrice: Int
        ProductImage: String
        stock: Int
        likes: Int
        tags: [String]

    }

    type Post {
        _id: ID!
        postContent: String
        likes: Int
        review: Boolean
        createdAt: Date
    }

    type Auth {
        token: ID!
        user: User
    }

    input ProductInput {
        productTitle: String!
        productDescription: String
        ProductPrice: Int
        ProductImage: String
        stock: Int
        tags: [String]
    }

    input PostReviewInput {
        postContent: String
        review: Boolean
        createdAt: Date
    }

    type Query {
        me(_id: ID!): User
        getUserStore: Store
        getUserProduct: Product
        getStores: [Store]
        getProducts: [Product]
        getPosts: [Post]
    }

    type Mutation {
        login(_id: ID!, email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): User
        addProduct(_id: ID!, productData: ProductInput!): User
        removeProduct(_id: ID!): User
        updateProduct(_id: ID!, productData: ProductInput!): User
        addPostReview(_id: ID!, postReviewData: PostReviewInput!): User
        removePostReview(_id: ID!): User
        updatePostReview(_id: ID!, postReviewData: PostReviewInput!): User
    }
`;

// Exporting module so it can be used in other files
module.exports = typeDefs;