import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function login(data) {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, {
            username: data.email, 
            password: data.password
        });

        if (response.data && response.data.success) {
            const token = response.data.data;
            localStorage.setItem('token', token);
            return response.data;
        }
        return {
            "success": false,
            "message": "Ocurrió un error en el servidor."
        }
    } catch (err) {
        throw err;
    }
}

export async function register(data) {
    try {
        const response = await axios.post(`${baseURL}/auth/register`, data);

        return response.data
    } catch (err) {
        throw err;
    }
}

export function logout() {
    localStorage.removeItem('token');
}
