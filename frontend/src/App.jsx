import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/registration' element={<RegistrationPage/>}/>
      <Route path='/main' element={<MainPage/>}/>
    </Routes>
  )
}

export default App