import { useMutation, useApolloClient } from "@apollo/client";
import { GoogleLoginResponse, useGoogleLogin } from "react-google-login";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";

import { GOOGLE_LOGIN, GOOGLE_SIGNUP } from "../utils/mutation/social";
import { User } from "../utils/types/user";
import { writeUserToCacheAndRedirect } from "../utils/helpers";

export const useSocialAuth = (mode: "register" | "login") => {
  const client = useApolloClient();
  const history = useHistory();
  const { state } = useLocation<string>();

  const [googleLogin, { loading: isLoggingInWithGoogle }] =
    useMutation(GOOGLE_LOGIN);
  const [googleSignUp, { loading: isSigningUpWithGoogle }] =
    useMutation(GOOGLE_SIGNUP);

  const handleGoogleSuccess = async (response: any) => {
    try {
      const tokenId = (response as GoogleLoginResponse).tokenId;
      const options = { variables: { tokenId } };
      const { data } = await (mode === "login"
        ? googleLogin(options)
        : googleSignUp(options));

      const user: User =
        mode === "login" ? data.googleLogin : data.googleSignUp;
      writeUserToCacheAndRedirect({ client, history, user, state });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleFailure = (error: any) => {
    let message = error.error?.split("_").join(" ");
    toast.error(message);
  };

  const { loaded, signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
    onSuccess: handleGoogleSuccess,
    onFailure: handleGoogleFailure,
  });

  return {
    googleSignIn: signIn,
    isLoading: !loaded || isSigningUpWithGoogle || isLoggingInWithGoogle,
  };
};
