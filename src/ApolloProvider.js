// import React from "react";
// import App from "./App";
// import ApolloClient from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
// import { ApolloProvider } from "@apollo/react-hooks";
// import { setContext } from "apollo-link-context";

// const httpLink = createHttpLink({
//   uri: "http://localhost:5000",
// });

// const authLink = setContext(() => {
//   const token = localStorage.getItem("jwtToken");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default (
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );

import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import App from "./App";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:5000" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
