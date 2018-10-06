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

// for the share button
// if (navigator.share) {
//   navigator.share({
//       title: 'WTF.youdo',
//       text: 'Share what you do!',
//       url: 'https://www.youdo.wtf/post',
//   })
//   .then(() => console.log('Successful share'))
//   .catch((error) => console.log('Error sharing', error));
// }

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2095ab' },
    secondary: { main: '#fda329' },
  },
});

const client = new ApolloClient({
  uri: '/graphql',
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
