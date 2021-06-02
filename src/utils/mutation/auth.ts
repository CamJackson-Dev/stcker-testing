import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../fragments/user";

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      firstname
      lastname
      email
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    register(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    )
  }
`;

export const RESEND_VERIFICATION_MAIL = gql`
  mutation ResendVerificationMail($email: String!) {
    resendVerificationMail(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const SEND_PASSWORDRESET_MAIL = gql`
  mutation SendPasswordResetMail($email: String!) {
    sendPasswordResetMail(email: $email)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
