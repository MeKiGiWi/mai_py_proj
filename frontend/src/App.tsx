import './App.css';
import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ProtectedRoute from './components/ProtectedRoute';
import RepeatLoginProtectedRoute from './components/RepeatLoginProtectedRoute';

import PageLoader from './components/PageLoader';

const SchedulePage = lazy(() => import('./pages/SchedulePage'));
const AboutTeamPage = lazy(() => import('./pages/AboutTeamPage'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route
        path="/about"
        element={
          <Suspense fallback={<PageLoader />}>
            <AboutTeamPage />
          </Suspense>
        }
      />

      <Route element={<RepeatLoginProtectedRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/schedule"
          element={
            <Suspense fallback={<PageLoader />}>
              <SchedulePage />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="*"
        element={<p className="text-3xl">There's nothing here: 404!</p>}
      />
    </Routes>
  );
};

export default App;
