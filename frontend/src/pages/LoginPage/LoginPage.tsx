import { Link, useNavigate } from 'react-router';
import GoogleLoginButton from './components/GoogleLoginButton';
import PlanItTag from '../../components/PlanItTag';
import { LoadingIcon } from '../../components/LoadingIcon';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/Auth';

function LoginPage() {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: ''
  });

  const [generalError, setGeneralError] = useState('');
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
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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
        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      </g>
    </svg>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}token/`, formData);
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      await checkAuth();
      navigate('/schedule');
    } catch (err) {
      setGeneralError(err.response?.data?.message || 'Неверные учетные данные');
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
              <p className="text-left mx-3 mb-1 font-semibold">Логин</p>
              <label className="input input-bordered flex items-center gap-2">
                <UserIcon />
                <input
                  type="text"
                  name="username"
                  placeholder="Введите логин"
                  className="w-full"
                  pattern="^[A-Za-z][A-Za-z0-9\-]{2,14}$"
                  title="Латиница, цифры и дефис. Начинается с буквы. 3-15 символов."
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </label>
            </div>

            {/* Поле password */}
            <div>
              <p className="text-left mx-3 mb-1 font-semibold">Пароль</p>
              <label className="input input-bordered flex items-center gap-2">
                <PasswordIcon />
                <input
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  className="w-full"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  title="Минимум 8 символов: одна цифра, строчная и заглавная буква"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-accent w-full h-12 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingIcon />
              ) : (
                'Войти'
              )}
            </button>

            {/* Общие ошибки */}
            {generalError && (
              <div className="alert alert-error mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{generalError}</span>
              </div>
            )}

            <div className='text-center'><span>или </span>
            <GoogleLoginButton /></div>
            <p className="text-sm">
              Нет аккаунта?{' '}
              <Link 
                to="/registration" 
                className="link link-accent"
              >
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