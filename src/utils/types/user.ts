import { Product } from "./product";

export interface User {
  __typename: "User";
  _id: string;
  carts: Product[];
  email: string;
  favourites: Product[];
  firstname: string;
  lastname: string;
}
