import React, { Component } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import Posts from './component/post/Posts';
import Auth from './component/auth/Auth';
import AppBar from './component/AppBar';
import GET_ME from './gql/getMe';
import { AuthConsumer, AuthProvider } from './context/Auth';

class App extends Component {
  render = () => (
    <AuthProvider>
      <AuthConsumer>
      {({ isLoggedin }) => {
        console.log('state isLoggedin', isLoggedin);
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
                  <AppBar profile={profile} />
                  { profile ? (<Posts />) : <Auth setIsLoggedin={this.setIsLoggedin} /> }
                </div>
              );
            }}
          </Query>
        );
      }}
      </AuthConsumer>
    </AuthProvider>
  );
}

export default App;
