import { useState } from 'react'
import MenuCard from './components/MenuCard';

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-end pb-5'>
          <span className='text-gray-900 dark:text-white'>
            Bienvenido, USER TEST
          </span>
        </div>
        <div className='flex grow justify-center items-center'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            <MenuCard moduleData={{
              name: "Inventario",
              description: "Consulta inventario",
              icon: "inventory"
            }} />
            <MenuCard moduleData={{
              name: "Salidas",
              description: "Realiza salidas",
              icon: "output"
            }} />
            <MenuCard moduleData={{
              name: "Bitácora",
              description: "Consulta movimientos",
              icon: "logbook"
            }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
