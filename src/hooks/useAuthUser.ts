import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../utils/queries/user";
import { User } from "../utils/types/user";

export const useAuthUser = () => {
  const { data } = useQuery(GET_AUTH_USER);

  return data?.me as User | null;
};
