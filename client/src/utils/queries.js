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
query GetUserStore($id: ID) {
  getUserStore(_id: $id) {
            _id
            products {
                _id
                productTitle
                productDescription
                ProductPrice
                ProductImage
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

