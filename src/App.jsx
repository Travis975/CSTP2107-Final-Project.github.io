// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'

function App() {
  // Using react router to handle routing through site
  const element = useRoutes([
    {
      path:'/HomePage',
      element:''
    }
  ]);

}

export default App
