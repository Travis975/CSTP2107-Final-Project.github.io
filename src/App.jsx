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
import TermsPage from './pages/TermsAndConditions';
import PrivacyPage from './pages/PrivacyPolicy';
import AccountPage from './pages/Account';

function App() {
  // Using react router to handle routing through site
  const routes = useRoutes([
    {
      path:'/',
      element: <HomePage />
    },
    {
      path:'/signin',
      element: <SignInPage />
    },
    {
      path:'/signup',
      element: <SignUpPage />
    },
    {
      path:'/movies',
      element: <MoviesPage />
    },
    {
      path:'/watch-trailer',
      element:< WatchPage />
    },
    {
      path:'/account',
      element:< AccountPage />
    },
    {
      path:'/terms-and-conditions',
      element:< TermsPage />
    },
    {
      path:'/privacy-policy',
      element:< PrivacyPage />
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
