import { Button, Card, Label, TextInput, Radio } from "flowbite-react";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        "username": '',
        "email": '',
        "password": '',
        "roleId": '2'
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("FORM DATA", data);            
            let response = await register(data)
            console.log("RESPONSE FRONT", response);
            
            if(response.success) {
                Swal.fire({
                    title: "Éxito",
                    text: response.message,
                    icon: "success",
                    showConfirmButton: false
                });
                navigate("/login")
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
                <h1 className="dark:text-white font-bold">Regístrate</h1>
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username">Nombre de Usuario</Label>
                        </div>
                        <TextInput id="username" type="text" placeholder="Escriba nombre..." required
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email">Correo Electrónico</Label>
                        </div>
                        <TextInput id="email" type="email" placeholder="Escriba su correo..." required
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password">Contraseña</Label>
                        </div>
                        <TextInput id="password" type="password" required 
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </div>
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Radio id="administradorRoleId" name="roleId" value="1" checked={data.roleId === "1"}
                                onChange={(e) => setData({ ...data, roleId: e.target.value })}
                            />
                            <Label htmlFor="administradorRoleId">Administrador</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio id="almacenistaRoleId" name="roleId" value="2" checked={data.roleId === "2"}
                                onChange={(e) => setData({ ...data, roleId: e.target.value })} 
                            />
                            <Label htmlFor="almacenistaRoleId">Almacenista</Label>
                        </div>
                    </div>
                    <Button type="submit">Enviar</Button>
                </form>
                <div className="flex justify-end">
                    <a href="" className="underline text-sm text-blue-500 hover:text-blue-300"
                        onClick={() => navigate("/login")}
                    >
                        Iniciar sesión
                    </a>
                </div>
            </Card>
        </div>
    );
}