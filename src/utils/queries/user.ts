import { gql } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "../fragments/product";

export const GET_AUTH_USER = gql`
  query Me {
    me {
      _id
      firstname
      lastname
      email
      carts {
        ...ProductFragment
      }
      favourites {
        ...ProductFragment
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;
