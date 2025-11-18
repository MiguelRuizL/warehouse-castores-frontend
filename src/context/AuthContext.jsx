import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/userService.js';
import { login as loginService, logout as logoutService } from '../services/AuthService';
import LoadingSpinner from '../pages/utils/LoadingSpinnerPage.jsx';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // checar si se está verificando token

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await getCurrentUser(); 
                    setUser(response.data.data);
                    setIsAuthenticated(true);
                } catch (error) {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkToken();
    }, []);

    const login = async (email, password) => {
        const response = await loginService({ email, password });
        const userResponse = await getCurrentUser();
        setUser(userResponse.data.data);
        setIsAuthenticated(true);
    };

    const logout = () => {
        logoutService(); // Borra el token de localStorage
        setUser(null);
        setIsAuthenticated(false);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};