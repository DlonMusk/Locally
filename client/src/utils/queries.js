import { gql } from "@apollo/client";

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
    }
    createdAt
  }
}
`