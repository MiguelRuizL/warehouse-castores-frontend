import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './index.css'

// Componentes
import ProtectedRoute from './components/auth/ProtectRoute.jsx';

// Layout
import AppLayout from './layouts/AppLayout.jsx';

// Páginas/vistas
import Login from './pages/auth/Login.jsx';
import Home from './pages/Home.jsx'
import Register from './pages/auth/Register.jsx';
import Inventory from './pages/products/Inventory.jsx';
import Output from './pages/products/Outputs.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/inventory",
            element: <Inventory />
          },
          {
            path: "/output",
            element: <Output />
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
)
