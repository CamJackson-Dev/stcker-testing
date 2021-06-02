import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import { TO_LOGIN_PAGE } from "../utils/constants";
import { LOGOUT_USER } from "../utils/mutation/auth";

export const useLogout = () => {
  const [logoutUser, { loading }] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    if (!loading) {
      try {
        await logoutUser();
        localStorage.removeItem("userId");
        window.location.replace(TO_LOGIN_PAGE);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return { handleLogout };
};
