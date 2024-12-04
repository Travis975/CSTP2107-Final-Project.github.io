// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Movies from './pages/Movies';

function App() {
  // Using react router to handle routing through site
  const routes = useRoutes([
    {
      path:'/',
      element: <HomePage />
    },
    {
      path:'/Signin',
      element: <SignInPage />
    },
    {
      path:'/Signup',
      element: <SignUpPage />
    },
    {
      path:'/Movies',
      element: <Movies />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }

  ]);

  return routes;

}

export default App
