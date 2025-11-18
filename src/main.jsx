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
import Logbook from './pages/logbook/Logbook.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

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
          { path: "/home", element: <Home /> }
        ]
      },
      {
        element: <ProtectedRoute role={['Administrador']} />,
        children: [
          
          { path: "/logbook", element: <Logbook /> }
        ]
      },
      {
        element: <ProtectedRoute role={['Almacenista']} />,
        children: [
          { path: "/output", element: <Output /> }
        ]
      },
      {
        element: <ProtectedRoute roles={['Admin', 'Almacenista']} />,
        children: [
          { path: "/inventory", element: <Inventory /> },
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>
)
