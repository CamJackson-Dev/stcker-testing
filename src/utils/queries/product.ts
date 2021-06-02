import { gql } from "@apollo/client";
import { PRODUCT_FRAGMENT } from "../fragments/product";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      items {
        ...ProductFragment
      }
      total
    }
  }
  ${PRODUCT_FRAGMENT}
`;
