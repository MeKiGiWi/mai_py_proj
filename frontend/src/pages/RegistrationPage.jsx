import { Link, useNavigate } from "react-router";
import PlanItTag from "../components/PlanItTag";
import { useState } from "react";
import axios from 'axios'

function RegistrationPage() {
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // sending post response to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
        confirm_password: confirmPassword
      });
      console.log("Статус ответа:", response.status); // Должно быть 201
      console.log("Данные ответа:", response.data);
      navigate('/login');

    }
    catch (err) {
      setError("Неверный логин пароль");
      console.error("Полный объект ошибки:", err);
    }
  }

  return (
    <>
    <main className='min-h-screen justify-center items-center flex text-center bg-base-200'>
    {/* Logo*/}
    <Link to={'/'}>
      <PlanItTag/>
    </Link>
    {/* Registration window */}
      <form onSubmit={handleSubmit} className='card card-border w-96 bg-base-100 '>
        <div className='card-title'>
          <h1 className='text-neutral w-full text-center text-3xl my-6'>Регистрация</h1>
        </div>

        {/* Input section */}
        <div className='card-body'>
          <div>
            <p className="text-neutral text-left mx-3 mb-1 font-semibold">Придумайте логин</p>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
              <input type="input" onChange={(e) => setUsername(e.target.value)} required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="15" title="Only letters, numbers or dash"/>
            </label>
          </div>

          <div>
            <p className="text-neutral text-left mx-3 mb-1 font-semibold">Придумайте пароль</p>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
              <input type="password" 
              required 
              placeholder="Password" 
              minLength="8"
              maxLength="20"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              title="Пароль должен быть длиной более 8 символов из которых минимум 1 маленькая 1 заглавная 1 цифра"/>
              
            </label>
          </div>

          <div>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
              <input 
              type="password" 
              required 
              placeholder="Confirm password" 
              minLength="8" 
              maxLength="20"
              pattern={password} 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              title="Пароли должны совпадать" />
            </label>
          </div>

          {/* Buttons section */}
          <button className='btn btn-accent mx-2 mt-1'>
            Зарегистрироваться
          </button>
          <p className="text-base-content text-xs"> Уже есть аккаунт? <b></b>
            <Link to='/login' className="link-hover text-base-content font-semibold text-xs">Войти</Link>
            </p>          
        </div>
      </form>
    </main>
    </>
  );
}
export default RegistrationPage;