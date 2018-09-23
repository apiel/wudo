import React, { Component } from 'react';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
    state = {
        isLoggedin: !!localStorage.getItem('token'),
    };

    setIsLoggedin = isLoggedin => this.setState({ isLoggedin });

  render() {
    const { children } = this.props;
    return (
        <AuthContext.Provider
            value={{
                setIsLoggedin: this.setIsLoggedin,
                isLoggedin: this.state.isLoggedin, // maybe use getIsLoggedin ??
            }}
        >
            {children}
        </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;