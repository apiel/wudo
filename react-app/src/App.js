import React, { Component } from 'react';
import { Query } from 'react-apollo';
// import get from 'lodash/get';

import Posts from './component/post/Posts';
import Auth from './component/auth/Auth';
import AppBar from './component/AppBar';
import GET_ME from './gql/getMe';

class App extends Component {
  render() {
    // const token = localStorage.getItem('token');
    // console.log('load token', token);
    return (
      <Query query={GET_ME}>
        {({ loading, error, data, client }) => {
          if (loading) return <p>Loading...</p>;
          // if (error) return <p>Error :(</p>; // we might have to check for proper error
          // eg if it s not 403/401 show an error

          // const profile = get(data, 'getMe'); // maybe we have to update the cache differently...
          // console.log('profileeeeee', profile);

          let profile = null;
          try {
            const { getMe } = client.readQuery({ query: GET_ME });
            profile = getMe;
          } catch (err) {}

          return (
            <div className="App">
              <AppBar profile={profile} />
              { profile ? (<Posts />) : <Auth /> }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
