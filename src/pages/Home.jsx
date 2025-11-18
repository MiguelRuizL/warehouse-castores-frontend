import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem } from "flowbite-react";
import MenuCard from '../components/MenuCard';
import { logout } from '../services/AuthService';
import { getCurrentUser } from '../services/userService';

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const onLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getCurrentUser();
        const userData = userResponse.data.data;

        console.log('USER', userData);
        setUsername(userData.username);
      } catch (error) {
        console.log('Error al obtener el usuario:', error);
      }
    };

    fetchUser();    
  }, []);

  return (
    <div className="flex w-full items-center justify-center">
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-end pb-5'>
          <span className='text-gray-900 dark:text-white'>
            Bienvenido, <span className='underline'>{username}</span>
          </span>
          <Dropdown inline label="" className=' dark:text-white dark:hover:text-gray-100'>
            <DropdownItem>
              <a
                href="#"
                onClick={onLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Cerrar sesión
              </a>
            </DropdownItem>
          </Dropdown>
        </div>
        <div className='flex grow justify-center items-center'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            <MenuCard moduleData={{
              name: "Inventario",
              description: "Consulta inventario",
              icon: "inventory",
              route: "/inventory"
            }} />
            <MenuCard moduleData={{
              name: "Salidas",
              description: "Realiza salidas",
              icon: "output",
              route: "/output"
            }} />
            <MenuCard moduleData={{
              name: "Bitácora",
              description: "Consulta movimientos",
              icon: "logbook",
              route: "/logbook"
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
