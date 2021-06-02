import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          favourites: {
            merge(_, incoming) {
              return incoming;
            },
          },
          carts: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  credentials: "include",
  uri: process.env.REACT_APP_GRAPHQL_API_URL,
});
