import './App.css'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}

export default App