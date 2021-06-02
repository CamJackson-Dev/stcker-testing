import { gql } from "@apollo/client";

export const GET_USER_ORDERS = gql`
  query UserOrders {
    userOrders {
      _id
      createdAt
      grossAmount
      items {
        _id
        name
        quantity
        price
      }
      shippingDetails {
        address
        city
        country
        postalCode
        phoneNumber
        state
        fullname
        email
      }
      paymentStatus
      orderStatus
    }
  }
`;
