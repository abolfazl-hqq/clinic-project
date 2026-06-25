"use client";

import {createContext, useContext, useState, useEffect} from 'react';
import {authService} from '@/lib/authService';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
            if (token) {
                try {
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                    setIsAuthenticated(true);
                    localStorage.setItem('user', JSON.stringify(userData));
                } catch {
                    // توکن منقضی و refresh هم کار نکرد
                    await authService.logout();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await authService.login(username, password);
            let userData = response.user;
            if (!userData) {
                userData = await authService.getCurrentUser();
            }
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userData));
            return {success: true, data: userData};
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            return {success: false, error};
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await authService.register(userData);
            const user = response.user;
            setUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(user));
            return {success: true, data: user};
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            return {success: false, error};
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{user, loading, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export {AuthProvider as default};