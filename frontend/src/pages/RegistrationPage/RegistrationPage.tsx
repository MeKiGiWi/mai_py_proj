import { Link, useNavigate } from 'react-router';
import PlanItTag from '../../components/PlanItTag';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [captchaToken, setCaptchaToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const validateForm = () => {
    const newErrors = { username: '', password: '', confirmPassword: '', general: '' };
    let isValid = true;

    // Валидация username
    if (!formData.username.match(/^[A-Za-z][A-Za-z0-9\-]*$/)) {
      newErrors.username = 'Только буквы, цифры или дефис';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Минимум 3 символа';
      isValid = false;
    } else if (formData.username.length > 15) {
      newErrors.username = 'Максимум 15 символов';
      isValid = false;
    }

    // Валидация пароля
    if (!formData.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
      newErrors.password = 'Цифра, строчная и заглавная буква';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Минимум 8 символов';
      isValid = false;
    }

    // Подтверждение пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // sending post response to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !captchaToken) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}register/`, {
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        recaptcha_token: captchaToken,
      });
      console.log('Статус ответа:', response.status); // Должно быть 201
      console.log('Данные ответа:', response.data);

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Полный объект ошибки:', err);
      setErrors(prev => ({...prev, general: 'Ошибка регистрации'}));
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
          <h1 className="text-3xl my-6">Регистрация</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Поле username */}
            <div>
              <p className="text-left mx-3 mb-1 font-semibold">Придумайте логин</p>
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
              <p className="text-left mx-3 mb-1 font-semibold">Придумайте пароль</p>
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

            {/* Подтверждение пароля */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <PasswordIcon />
                <input
                  type="password"
                  className="grow"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </label>
              {errors.confirmPassword && (
                <div className="text-error text-sm text-left ml-3 mt-1">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            
            <div className="w-full flex justify-center my-4">
              <ReCAPTCHA
                sitekey="6LehTfUqAAAAACy_psBXjlvWXwCymnjvz26aLW72"
                onChange={(token) => setCaptchaToken(token || '')}
              />
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

            <p className="text-sm mt-4">
              Уже есть аккаунт? {' '}
              <Link to="/login" className="link link-accent">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;