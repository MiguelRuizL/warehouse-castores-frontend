import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function getCurrentUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No hay token de autenticación. Inicie sesión. ");

        let response = await axios.get(`${baseURL}/user/currentUser`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        
        return response;
    } catch (error) {
        throw error;
    }
}