import React, { Component } from 'react';

import Posts from './component/post/Posts';
import Auth from './component/Auth/Auth';
import AppBar from './component/AppBar';

class App extends Component {
  render() {
    const token = localStorage.getItem('token');
    console.log('token', token);
    return (
      <div className="App">
        <AppBar />
        { token ? (<Posts />) : <Auth /> }
      </div>
    );
  }
}

export default App;
