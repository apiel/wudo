import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import client from './apollo';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2095ab' },
    secondary: { main: '#fda329' },
  },
});

const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
})

const AppApollo = () => (
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
        <App />
        </MuiThemeProvider>
    </ApolloProvider>
  );

ReactDOM.render(<AppApollo />, document.getElementById('root'));
registerServiceWorker();
