// import ApolloClient from 'apollo-boost';

// export default new ApolloClient({
//   uri: "http://localhost:5000/graphql"
  
// });

import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  debugger;
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('admintoken');
  if(!!token){
      // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }); 
  }
  // Call the next link in the middleware chain.
  return forward(operation);
});

export default new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});