import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import Routes from './Routes';
import Auth from './component/auth/Auth';
import GET_ME from './gql/query/getMe';
import { AuthConsumer, AuthProvider } from './context/Auth';


const App = () => (
  <AuthProvider>
    <AuthConsumer>
    {({ isLoggedin }) => {
      // console.log('state isLoggedin', isLoggedin);
      const skip = !isLoggedin;
      return (
        <Query query={GET_ME} skip={skip}>
          {({ loading, error, data }) => {
            if (!skip && loading) return <p>Loading...</p>;
            // if (error) return <p>Error :(</p>; // we might have to check for proper error
            // eg if it s not 403/401 show an error

            const profile = get(data, 'getMe');
            return (
              <div className="App">
                { profile ? (<Routes />) : <Auth /> }
              </div>
            );
          }}
        </Query>
      );
    }}
    </AuthConsumer>
  </AuthProvider>
);

export default App;
