import { ApolloClient } from "@apollo/client";
import { GET_AUTH_USER } from "./queries/user";
import { Product } from "./types/product";
import { TO_HOME_PAGE } from "./constants";
import { User } from "./types/user";
import * as H from "history";

interface Options {
  client: ApolloClient<object>;
  user: User;
  history: H.History;
  state: string;
}

export function writeUserToCacheAndRedirect(options: Options) {
  const { client, history, state, user } = options;

  client.writeQuery({
    query: GET_AUTH_USER,
    data: { me: user },
  });

  localStorage.setItem("userId", user._id);
  state ? history.push(state as string) : history.push(TO_HOME_PAGE);
}

export function calculateTotalPrice(cart: Record<string, Product>) {
  let totalPrice = 0;
  Object.values(cart).forEach((product) => {
    totalPrice += product.count! * product.price;
  });

  return ((totalPrice * 100) / 100).toFixed(2);
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function filterProducts(products: Product[], search: string) {
  const splitSearchString = search.toLowerCase().split(" ");

  return products.filter((product) => {
    const callback = (string: string) =>
      product.name.toLowerCase().includes(string);
    return splitSearchString.some(callback);
  });
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}
