import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments/user";

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($tokenId: String!) {
    googleLogin(tokenId: $tokenId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GOOGLE_SIGNUP = gql`
  mutation GoogleSignUp($tokenId: String!) {
    googleSignUp(tokenId: $tokenId) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
