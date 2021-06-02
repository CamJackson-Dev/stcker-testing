import { ApolloCache, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useModalContext } from "../utils/modal";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../utils/mutation/user";
import { GET_AUTH_USER } from "../utils/queries/user";
import { Product } from "../utils/types/product";
import { User } from "../utils/types/user";
import { useAuthUser } from "./useAuthUser";

export const useCart = () => {
  const user = useAuthUser();
  const { setModalState } = useModalContext();

  const [addToCart, { loading: isAddingToCart }] = useMutation(ADD_TO_CART);
  const [removeFromCart, { loading: isRemovingFromCart }] =
    useMutation(REMOVE_FROM_CART);

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      setModalState("login");
      return;
    }

    try {
      await addToCart({
        variables: { productId: product._id },
        update: (cache) => {
          addToUserCartsInCache({ cache, product });
        },
      });
      toast.success(product.name + " has been added to cart");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveFromCart = async (options: {
    product: Product;
    all: boolean;
  }) => {
    if (!user) {
      setModalState("login");
      return;
    }

    const { product, all } = options;
    try {
      await removeFromCart({
        variables: { productId: product._id, all },
        update: (cache) => {
          removeUserCartsInCache({ cache, product, all });
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    isTogglingCart: isAddingToCart || isRemovingFromCart,
  };
};

function addToUserCartsInCache(options: {
  cache: ApolloCache<any>;
  product: Product;
}) {
  const { cache, product } = options;
  const data = cache.readQuery({ query: GET_AUTH_USER }) as any;
  if (!data?.me) return;

  const user = data.me as User;
  let newCarts = [...user.carts];
  newCarts.push(product);

  cache.writeQuery({
    query: GET_AUTH_USER,
    data: { me: { ...user, carts: newCarts } },
  });
}

function removeUserCartsInCache(options: {
  cache: ApolloCache<any>;
  product: Product;
  all: boolean;
}) {
  const { cache, product, all } = options;
  const data = cache.readQuery({ query: GET_AUTH_USER }) as any;
  if (!data?.me) return;

  const user = data.me as User;
  let newCarts = [...user.carts];

  if (all) {
    newCarts = newCarts.filter((item) => item._id !== product._id);
  } else {
    const index = newCarts.findIndex((item) => item._id === product._id);
    if (index !== -1) newCarts.splice(index, 1);
  }

  cache.writeQuery({
    query: GET_AUTH_USER,
    data: { me: { ...user, carts: newCarts } },
  });
}
