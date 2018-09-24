import React, { Component } from 'react';
import { getToken, setToken } from '../utils/storage';

const AuthContext = React.createContext();

export class AuthProvider extends Component {
    state = {
        isLoggedin: !!getToken(),
    };

    setIsLoggedin = isLoggedin => this.setState({ isLoggedin });

    saveToken = token => {
        setToken(token);
        this.setIsLoggedin(true);
    }

    render() {
        const { children } = this.props;
        return (
            <AuthContext.Provider
                value={{
                    setIsLoggedin: this.setIsLoggedin,
                    isLoggedin: this.state.isLoggedin, // maybe use getIsLoggedin ??
                    saveToken: this.saveToken,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }
}

export const AuthConsumer = AuthContext.Consumer;