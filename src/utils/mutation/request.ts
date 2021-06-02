import { gql } from "@apollo/client";

export const CREATE_REQUEST = gql`
  mutation CreateRequest($params: RequestInput!) {
    createRequest(params: $params)
  }
`;
