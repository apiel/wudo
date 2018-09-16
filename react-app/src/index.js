import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2095ab' },
    secondary: { main: '#fda329' },
  },
});

const client = new ApolloClient({
    uri: '/graphql',
});

const AppApollo = () => (
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
        <App />
        </MuiThemeProvider>
    </ApolloProvider>
  );

ReactDOM.render(<AppApollo />, document.getElementById('root'));
registerServiceWorker();