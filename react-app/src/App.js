import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import Routes from './Routes';
import Footer from './Footer';
import Auth from './component/auth/Auth';
import GET_ME from './gql/query/getMe';

const App = () => (
  <Query query={GET_ME}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      // if (error) return <p>Error :(</p>; // we might have to check for proper error
      // eg if it s not 403/401 show an error

      const profile = get(data, 'getMe');
      return (
        <div className="App">
          { profile ? (<Routes />) : <Auth /> }
          <Footer />
        </div>
      );
    }}
  </Query>
);

export default App;
