import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_STORE = gql`
	mutation addStore($storeData: StoreInput!) {
		addStore(storeData: $storeData) {
			_id
			username
			email
			createdAt
		}
	}
`;

export const ADD_PRODUCT = gql`
mutation addProduct($productData: ProductInput!) {
  addProduct(productData: $productData) {
    storeTitle
    rating
    address
    email
    phoneNumber
    createdAt
  }
}
`;

export const REMOVE_PRODUCT = gql`
	mutation removeProduct($productId: ID!) {
		removeProduct(productId: $productId) {
			_id
			storeTitle
			rating
			address
			email
			phoneNumber
			createdAt
		}
	}
`;

export const UPDATE_PRODUCT = gql`
	mutation updateProduct($productId: ID!, $productData: ProductInput!) {
		updateProduct(productId: $productId, productData: $productData) {
			_id
			productTitle
			productDescription
			productPrice
			productImage
			stock
			likes
			createdAt
		}
	}
`;

export const ADD_POST_REVIEW = gql`
mutation Mutation($postReviewData: PostReviewInput!) {
  addPostReview(postReviewData: $postReviewData) {
    _id
    username
    createdAt
  }
}
`;

export const REMOVE_POST_REVIEW = gql`
	mutation removePostReview($postId: ID!) {
		removePostReview(postId: $postId) {
			_id
			username
			email
			createdAt
		}
	}
`;

export const UPDATE_POST_REVIEW = gql`
	mutation updatePostReview($postReviewData: PostReviewInput!) {
		updatePostReview(postReviewData: $postReviewData) {
			_id
			postContent
			likes
			destinationId
			createdAt
		}
	}
`;


export const ADD_LIKE = gql`
	mutation addLike($componentId: ID!){
		addLike(componentId: $componentId){
			_id
		}
	}
`
