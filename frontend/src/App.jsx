import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import AboutTeamPage from './pages/AboutTeamPage'
import ProtectedRoute from './components/ProtectedRoute'
import RepeatLoginProtectedRoute from './components/RepeatLoginProtectedRoute'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='/aboutteam' element={<AboutTeamPage/>}/>

      <Route element={<RepeatLoginProtectedRoute/>}>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path='/main' element={<MainPage/>}/>
      </Route>

      <Route path="*" element={<p className='text-3xl'>There's nothing here: 404!</p>} />
    </Routes>
  )
}

export default App