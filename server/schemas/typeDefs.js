// Setting up file requirements
const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Date

    type User {
        _id: ID!
        username: String!
        email: String
        password: String
		profileImg: String
		profileBanner: String
        store: Store
        reviews: [Post]
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
		email: String!
		address: String!
		phoneNumber: String
		tags: [String]
	}

	type Product {
		_id: ID!
		productTitle: String!
		productDescription: String
		productPrice: Int
		productImage: String
		stock: Int
		likes: Int
		tags: [String]
		reviews: [Post]
		createdAt: Date
        storeInfo: Store
	}

	input ProductInput {
		productTitle: String!
		productDescription: String
		productPrice: Int
		productImage: String
		stock: Int
		tags: [String]
        storeInfo: ID!
	}


    type Post {
        _id: ID!
        postContent: String
        likes: Int
        review: Boolean
        destinationId: Product
        userData: User
        createdAt: Date
    }

	input PostReviewInput {
		postContent: String
		review: Boolean!
        destinationId: ID
        userData: ID!
		createdAt: Date
	}

	type Auth {
		token: ID!
		user: User
	}


    
    type Query {
        me: User
        getUser(_id: ID!): User
        getStore(_id: ID): Store
        getUserProduct(_id: ID): Product
        getUserPosts(_id: ID): User
        getStores: [Store]
        getProducts(searchName: String, tagState: String): [Product]
        getPosts: [Post]
        getUserByStore(_id: ID!): User
    }


	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addStore(storeData: StoreInput!): User
        updateStore(_id: ID!, storeData: StoreInput!): Store
		removeStore(storeId: ID!): Store
		addProduct(productData: ProductInput!): Store
		removeProduct(productId: ID!): Store
		updateProduct(_id: ID!, productData: ProductInput!): Product
		addPostReview(postReviewData: PostReviewInput!): User
		removePostReview(postId: ID!): User
		updatePostReview(postReviewData: PostReviewInput!): Post
		addLike(componentId: ID!): User
	}
`;

// Exporting module so it can be used in other files
module.exports = typeDefs;
