import { gql } from "@apollo/client";

export const QUERY_GET_USER_STORE = gql`
    {
        getUserStore {
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