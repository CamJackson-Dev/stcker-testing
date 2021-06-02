import { ApolloCache, useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import { useModalContext } from "../utils/modal";
import { TOGGLE_FAVOURITES } from "../utils/mutation/user";
import { GET_AUTH_USER } from "../utils/queries/user";
import { Product } from "../utils/types/product";
import { User } from "../utils/types/user";
import { useAuthUser } from "./useAuthUser";

export const useFavourite = () => {
  const user = useAuthUser();
  const { setModalState } = useModalContext();

  const [toggleFavourites, { loading }] = useMutation(TOGGLE_FAVOURITES);

  const handleToggleFavourite = async (product: Product) => {
    if (!user) {
      setModalState("login");
      return;
    }

    try {
      await toggleFavourites({
        variables: { productId: product._id },
        update: (cache) => {
          updateUserFavouritesInCache({ cache, product });
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    handleToggleFavourite,
    isTogglingFavourite: loading,
  };
};

function updateUserFavouritesInCache(options: {
  cache: ApolloCache<any>;
  product: Product;
}) {
  const { cache, product } = options;

  const data = cache.readQuery({ query: GET_AUTH_USER }) as any;
  if (!data?.me) return;

  const user = data.me as User;
  const index = user.favourites.findIndex(
    (favouriteProduct) => favouriteProduct._id === product._id
  );
  let newFavourites = [...user.favourites];

  if (index === -1) {
    newFavourites.push(product);
  } else {
    newFavourites.splice(index, 1);
  }

  cache.writeQuery({
    query: GET_AUTH_USER,
    data: { me: { ...user, favourites: newFavourites } },
  });
}
