import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: String!) {
    addToCart(productId: $productId)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($params: ChangePasswordInput!) {
    changePassword(params: $params)
  }
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile($params: EditProfileInput!) {
    editProfile(params: $params)
  }
`;

export const TOGGLE_FAVOURITES = gql`
  mutation ToggleFavourites($productId: String!) {
    toggleFavourites(productId: $productId)
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: String!, $all: Boolean!) {
    removeFromCart(productId: $productId, all: $all)
  }
`;
