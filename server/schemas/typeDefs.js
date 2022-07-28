// Setting up file requirements
const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        password: String
        store: Store
        reviews: [Reviews]
    }

    type Store {
        _id: ID!
        products: [Products]
        rating: Int
        reviews: [Reviews]
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
        me: User
        getStores: [Store]
        getProducts: [Product]
        getPosts: [Post]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, store: Store!): Auth
        addProduct(productData: ProductInput!): Store
        removeProduct(_id: ID!): Store
        updateProduct(productData: ProductInput!): Store
        addPostReview(postReviewData: PostReviewInput!): Store
        removePostReview(_id: ID!): Store
        updatePostReview(postReviewData: PostReviewInput!): Store
    }
`;

// Exporting module so it can be used in other files
module.exports = typeDefs;