import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {client} from './config/apollo'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);