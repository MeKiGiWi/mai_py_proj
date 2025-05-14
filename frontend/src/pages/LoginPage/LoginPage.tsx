import { Link, useNavigate } from 'react-router';
import GoogleLoginButton from './components/GoogleLoginButton';
import PlanItTag from '../../components/PlanItTag';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/Auth';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

  const UserIcon = () => (
    <svg
      className="h-[1em] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </g>
    </svg>
  );
  const PasswordIcon = () => (
    <svg
      className="h-[1em] opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2.5"
        fill="none"
        stroke="currentColor"
      >
        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
      </g>
    </svg>
  );

  const validateForm = () => {
    const newErrors = { username: '', password: '', general: '' };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = 'Введите логин';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const SpinnerIcon = () => (
    <svg 
      className="animate-spin h-6 w-6 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}token/`, formData);
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      await checkAuth();
      navigate('/schedule');
    } catch (err) {
      setErrors(prev => ({...prev, general: 'Неверные учетные данные'}));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen justify-center items-center flex text-center bg-base-200">

      {/* Logo*/}
      <Link to={'/'}>
        <PlanItTag />
      </Link>

      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl my-6">Добро пожаловать!</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Поле username */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <UserIcon />
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </label>
              {errors.username && (
                <div className="text-error text-sm text-left ml-3 mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            {/* Поле password */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <PasswordIcon />
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </label>
              {errors.password && (
                <div className="text-error text-sm text-left ml-3 mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-accent w-full h-12 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <SpinnerIcon />
              ) : (
                'Войти'
              )}
            </button>

            {errors.general && (
              <div className="alert alert-error justify-center text-center">
                {errors.general}
              </div>
            )}
            <div className='text-center'><span>или </span>
            <GoogleLoginButton /></div>

            <p className="text-sm mt-4">
              Нет аккаунта? {' '}
              <Link to="/registration" className="link link-accent">
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;