import { Link, useNavigate } from 'react-router';
import PlanItTag from '../../components/PlanItTag';
import { LoadingIcon } from '../../components/LoadingIcon';
import { UserIcon } from '../LoginPage/components/UserIcon';
import { PasswordIcon } from '../LoginPage/components/PasswordIcon';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

function RegistrationPage() {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [generalError, setGeneralError] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // sending post response to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!captchaToken) {
      setGeneralError('Пожалуйста, пройдите проверку reCAPTCHA');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setGeneralError('Пароли не совпадают');
      return;
    }

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
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setGeneralError(message || 'Неверные учетные данные');
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError('Неверные учетные данные');
      }
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
              <label className="input input-bordered flex w-full items-center gap-2 has-[:autofill]:bg-base-100">
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
              <p className="text-left mx-3 mb-1 font-semibold">Придумайте пароль</p>
              <label className="input input-bordered flex w-full items-center gap-2 has-[:autofill]:bg-base-100">
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

            {/* Подтверждение пароля */}
            <div>
            <label className="input input-bordered flex w-full items-center gap-2 has-[:autofill]:bg-base-100">
                <PasswordIcon />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                  className="w-full"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  title="Пароли должны совпадать"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </label>
            </div>
            
            <div className="w-full flex justify-center my-4">
            <ReCAPTCHA
              sitekey="6LehTfUqAAAAACy_psBXjlvWXwCymnjvz26aLW72"
              onChange={(e) => setCaptchaToken(e || '')}
            />
            </div>

            {/* Кнопка отправки */}
            <button 
              type="submit" 
              className="btn btn-accent w-full h-12 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingIcon />
              ) : (
                'Зарегистрироваться'
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

            <p className="text-sm">
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