import { gql } from "@apollo/client";

export const QUERY_GET_USER_STORE = gql`
    {
        getUserStore {
            _id
            username
            store {
                _id
                email
                address
                phoneNumber
                tags
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
            }
        }
    }
`;