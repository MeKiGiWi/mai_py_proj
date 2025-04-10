import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SchedulePage from './pages/SchedulePage';
import AboutTeamPage from './pages/AboutTeamPage';
import ProtectedRoute from './components/ProtectedRoute';
import RepeatLoginProtectedRoute from './components/RepeatLoginProtectedRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/about' element={<AboutTeamPage />} />

      <Route element={<RepeatLoginProtectedRoute />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='/schedule' element={<SchedulePage />} />
      </Route>

      <Route path='*' element={<p className='text-3xl'>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default App;
