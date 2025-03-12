import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import AboutTeamPage from './pages/AboutTeamPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/registration' element={<RegistrationPage/>}/>
      <Route path='/main' element={<MainPage/>}/>
      <Route path='/aboutteam' element={<AboutTeamPage/>}/>
    </Routes>
  )
}

export default App