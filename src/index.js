import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from 'react-apollo' // Similar to the providers from Redux
import { createHttpLink } from 'apollo-link-http' // Let us connect our client to our backend endpoint
import { InMemoryCache } from 'apollo-cache-inmemory' // Apollo uses to cache info allowing to not need double requests
import { ApolloClient } from 'apollo-boost' //

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers'

// Create our link
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
})

// Create our cache
const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers,
})

// Default values for our local state variables
client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
    priceTotal: 0,
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
