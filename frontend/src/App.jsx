import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router'
import RegistrationPage from './pages/RegistrationPage'
import TestPage from './pages/TestPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/registration' element={<RegistrationPage/>}/>
    </Routes>
  )
}

export default App