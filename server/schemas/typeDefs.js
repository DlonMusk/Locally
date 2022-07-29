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
        posts: [Post]
        createdAt: Date
    }

    type Store {
        _id: ID!
        storeTitle: String
        products: [Product]
        rating: Int
        reviews: [Post]
        address: String
        email: String
        phoneNumber: String
        tags: [String]
        createdAt: Date
    }

    input StoreInput {
        storeTitle: String!
        storeEmail: String!
        address: String!
        phoneNumber: String
        tags: [String]
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
        reviews: [Post]
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

    type Post {
        _id: ID!
        postContent: String
        likes: Int
        review: Boolean
        destinationId: ID!
        createdAt: Date
    }

    input PostReviewInput {
        postContent: String
        review: Boolean
        createdAt: Date
    }

    type Auth {
        token: ID!
        user: User
    }

    
    type Query {
        me: User
        getUserStore(_id: ID): Store
        getUserProduct(_id: ID): Product
        getUserPosts(_id: ID): [Post]
        getStores: [Store]
        getProducts: [Product]
        getPosts: [Post]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addUserStore(storeData: StoreInput!): User
        addProduct(productData: ProductInput!): Store
        removeProduct(productId: ID!): Store
        updateProduct(productId: ID!, productData: ProductInput!): Product
        addPostReview(destinationId: ID!, postReviewData: PostReviewInput!): User
        removePostReview(postId: ID!): User
        updatePostReview(_id: ID!, postReviewData: PostReviewInput!): User
    }
`;

// Exporting module so it can be used in other files
module.exports = typeDefs;