import { gql } from "@apollo/client";


export const GET_ME = gql`
 query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_GET_USER = gql`
	query Query($id: ID!) {
		getUser(_id: $id) {
			_id
			username
			email
			createdAt
		}
	}
`;

export const QUERY_GET_USER_STORE = gql`
	query getStore($id: ID) {
		getStore(_id: $id) {
			_id
			products {
				_id
				productTitle
				productDescription
				productPrice
				productImage
				stock
				likes
				tags
			}
			rating
			address
			email
			phoneNumber
			tags
			createdAt
		}
	}
`;

export const QUERY_GET_USER_STORE_PROFILE = gql`
	query getStore($id: ID) {
		getStore(_id: $id) {
			_id
			rating
			address
			email
			phoneNumber
			tags
			createdAt
		}
	}
`;

export const QUERY_GET_PRODUCTS = gql`
query GetProducts {
  getProducts {
    _id
    productTitle
    productDescription
    productPrice
    productImage
    stock
    likes
    tags
    createdAt
    storeInfo {
      _id
      storeTitle
      address
    }
  }
}
`;

export const QUERY_GET_USER_PRODUCT = gql`

query Query($id: ID) {
  getUserProduct(_id: $id) {
    _id
    productTitle
    productDescription
    productPrice
    productImage
    stock
    likes
    tags
    reviews {
      _id
      postContent
      likes
      review
      userData {
        _id
        username
      }
      createdAt
    }
    createdAt
  }
}
`

export const QUERY_GET_USER_POSTS = gql`
query Query($id: ID) {
  getUserPosts(_id: $id) {
    _id
    username
    reviews {
      _id
      postContent
      likes
      review
      destinationId{
        _id
        productTitle
        productImage
      }
      createdAt
    }
  }
}
`

export const QUERY_GET_STORE_REVIEWS = gql`

query GetStore($id: ID) {
  getStore(_id: $id) {
    _id
    storeTitle
    products {
      _id
      productTitle
      productImage
      reviews {
        _id
        postContent
        likes
        review
        destinationId{
          _id
        }
        createdAt
        userData{
          _id
          username
        }
      }
    }
  }
}
`
