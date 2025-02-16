import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Load from localStorage on first render
        const token = localStorage.getItem('token');
        if (token) {
            try {
                return { token, user: jwtDecode(token) };
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
        return { token: null, user: null };
    });

    // On initial load, check if a token is saved in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                setAuth({ token, user: decoded });
            } catch (error) {
                console.error('Token decode failed:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    // Login: Save the token and update auth state
    const login = (token) => {
        try {
            const decoded = jwtDecode(token);
            localStorage.setItem('token', token);
            setAuth({ token, user: decoded });
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    // Logout: Clear token from localStorage and reset state
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, user: null });
    };

    const isAuthenticated = !!auth.token;

    return (
        <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes;