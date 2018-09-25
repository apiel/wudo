import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import get from 'lodash/get';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import client from './apollo';

import { getToken, setToken } from './utils/storage';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2095ab' },
    secondary: { main: '#fda329' },
  },
});

const client = new ApolloClient({
  uri: '/graphql',
  onError: error => {
    const errorCode = get(error, 'networkError.result.error.code');
    // console.log('errorCode', errorCode);
    if (errorCode === 'invalid_token') {
      setToken(''); // null does not work, we could also do localStorage.removeItem
    }
  },
  request: (operation) => {
    const token = getToken();
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
})

const AppApollo = () => (
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MuiThemeProvider>
    </ApolloProvider>
  );

ReactDOM.render(<AppApollo />, document.getElementById('root'));
registerServiceWorker();
