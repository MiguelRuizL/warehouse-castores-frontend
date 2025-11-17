import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='flex flex-row min-h-screen w-full bg-white dark:bg-gray-900 p-5'>
      <Home />
    </div>
  </StrictMode>
)
