// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import SignInPage from './pages/Signin';
import SignUpPage from './pages/Signup';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MoviesPage from './pages/Movies';
import WatchPage from './pages/WatchTrailer';
import Navbar from './components/Navbar';

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
      element: <MoviesPage />
    },
    {
      path:'/WatchTrailer',
      element:< WatchPage />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }

  ]);

  return (
    <>
      <Navbar />
      {routes}
    </>
   )

}

export default App
