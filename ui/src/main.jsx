import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from './store/AuthContext.jsx';
import { Routes } from "./routes.jsx";
import './main.css';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const router = createBrowserRouter(Routes);

root.render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
