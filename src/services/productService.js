import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts(status = '') {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No hay token de autenticación. Inicie sesión. ");

        let response = await axios.get(`${baseURL}/products?status=${status}`, {
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

export async function createProduct(data) {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No hay token de autenticación. Inicie sesión. ");

        let response = await axios.post(
            `${baseURL}/products`, data, {
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

export async function editProduct(id, data) {
    try {
        // return data;
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No hay token de autenticación. Inicie sesión. ");
        if (!id || id == null) throw new Error("Datos inválidos. Consulte al amdinistrador.");

        let response = await axios.put(
            `${baseURL}/products/${id}`, data, {
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

export async function editQuantity(data) {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No hay token de autenticación. Inicie sesión. ");

        let response = await axios.patch(
            `${baseURL}/products/${data.id}`, {
                "type": data.type,
                "toSumQuantity": parseInt(data.toSumQuantity)
            }, 
            {
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