import { gql } from "@apollo/client";

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    _id
    name
    image
    price
  }
`;
