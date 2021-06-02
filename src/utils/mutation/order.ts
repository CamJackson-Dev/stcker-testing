import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder
  }
`;

export const CAPTURE_ORDER = gql`
  mutation CaptureOrder($orderID: String!) {
    captureOrder(orderID: $orderID)
  }
`;
