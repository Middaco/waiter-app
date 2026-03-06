import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import AuthenticationForm from './Pages/HomePage/AutheticationPage';
import HomePage from './Pages/HomePage/HomePage';
import AddTerrariumForm from './Pages/HomePage/AddTerrariumPage';
import RegisterPage from './Pages/HomePage/RegisterPage';
import UserProfilePage from './Pages/HomePage/UserProfilePage'
import TerrariumsList from './PageComponents/TerrariumsList';
import ShoppingCartPage from './Pages/HomePage/ShoppingCartPage';
import { routerMiddleware } from './Utils/RouterMiddleware';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationForm />
  },
  {
    path: "/home",
    element: <HomePage />,
    children:[
      {
        index: true,
        element: <TerrariumsList />,
        handle: routerMiddleware()
      },
      {
        path: "profile",
        element: <UserProfilePage />,
        handle: routerMiddleware()
      },
      {
        path: "cart",
        element: <ShoppingCartPage/>,
      }
    ]
  },
  {
    path: "/addTerrarium",
    element: <AddTerrariumForm />,
    handle: routerMiddleware
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
