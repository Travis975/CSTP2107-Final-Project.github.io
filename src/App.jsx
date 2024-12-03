// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Movies from './pages/Movies';

function App() {
  // Using react router to handle routing through site
  const element = useRoutes([
    {
      path:'/',
      element: <HomePage />
    },
    {
      path:'/Signin',
      element: <Signin />
    },
    {
      path:'/Signup',
      element: <Signup />
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

}

export default App
