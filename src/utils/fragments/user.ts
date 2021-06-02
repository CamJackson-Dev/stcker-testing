import { gql } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "./product";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
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
  ${PRODUCT_FRAGMENT}
`;
