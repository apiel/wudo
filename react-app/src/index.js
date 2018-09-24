import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import client from './apollo';

import { getToken } from './utils/storage';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2095ab' },
    secondary: { main: '#fda329' },
  },
});

const client = new ApolloClient({
  uri: '/graphql',
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
