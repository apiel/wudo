import React, { Component } from 'react';

import Posts from './component/post/Posts';
import AppBar from './component/AppBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Posts />
      </div>
    );
  }
}

export default App;
