import { Button, Card, Label, TextInput } from "flowbite-react";
import { login } from "../../services/AuthService";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Swal from 'sweetalert2';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await login({
                "email": email,
                "password": password
            })
            console.log("RESPONSE FRONT", response);
            
            if(response.success) {
                Swal.fire({
                    title: "¡Autenticación exitosa!",
                    icon: "success",
                    showConfirmButton: false
                });
                navigate("/home")
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.message,
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
            });
        }
        
    }

    return (
        <div className="flex w-full items-center justify-center">
            <Card className="max-w-md">
                <h1 className="dark:text-white font-bold">Inicia Sesión</h1>
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Correo Electrónico</Label>
                        </div>
                        <TextInput id="email" type="email" placeholder="Escriba su correo..." required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Contraseña</Label>
                        </div>
                        <TextInput id="password" type="password" required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
                <div className="flex justify-end">
                    <a className="underline text-sm text-blue-500 hover:text-blue-300"
                        onClick={(e) => navigate('/register')}
                    >
                        Registrarse
                    </a>
                </div>
            </Card>
        </div>
    );
}