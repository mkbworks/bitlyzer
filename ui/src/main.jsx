import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from './context/AuthContext.jsx';
import { Routes } from "./routes.jsx";
import { THEME } from './styles/theme.js';
import './main.css';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const router = createBrowserRouter(Routes);

root.render(
  <StrictMode>
    <AuthProvider>
        <ThemeProvider theme={THEME}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
