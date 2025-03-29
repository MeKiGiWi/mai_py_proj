import { Link } from "react-router";
import GoogleLoginButton from "./components/GoogleLoginButton";
import PlanItTag from "../../components/PlanItTag";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/Auth";


function LoginPage() {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);
  // const {isAuth} = useContext(AuthContext);

  // useEffect(() => {console.log(`isAuth = ${isAuth}`)}, [isAuth])

  // Login validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      // adding tokens to local storage
      localStorage.setItem('access_token', response.data.access); 
      localStorage.setItem('refresh_token', response.data.refresh);
      // localStorage.setItem('user', JSON.stringify(response.data.user))
      // try to login with token
      await checkAuth();
      navigate('/schedule');
    }
    catch (err) {
      setError("Неверный логин или пароль");
      console.error(err);
    }
  }

  return (
    <>
    <main className='min-h-screen justify-center items-center flex text-center bg-base-200'>
    {/* Logo*/}
    <Link to={'/'}>
      <PlanItTag/>
    </Link>
    {/* Login window */}
      <form 
      className='card card-border w-96 bg-base-100 '
      onSubmit={handleSubmit} // might be appended that this auth form
      >
        <div className='card-title'>
          <h1 className='text-neutral w-full text-center text-3xl my-6'>Добро пожаловать!</h1>
        </div>

        {/* Input section */}
        <div className='card-body'>
          <div>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
              <input 
              type="input" 
              required 
              placeholder="Username" 
              pattern="[A-Za-z][A-Za-z0-9\-]*" 
              minLength="3" 
              maxLength="15" 
              title="Only letters, numbers or dash" 
              onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <p className="validator-hint hidden">
              Must be 3 to 20 characters
              <br/>containing only letters, numbers or dash
              <br/>Can only start with letters
            </p> 
          </div>

          <div>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
              <input 
              type="password" 
              required 
              placeholder="Password" 
              minLength="8" 
              maxLength="20"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
              onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br/>At least one number
              <br/>At least one lowercase letter
              <br/>At least one uppercase letter
            </p>
          </div>

          {/* Buttons section */}
          <div className="w-80 justify-center items-center mx-2">
            <button 
            className='btn flex btn-accent w-full mb-1'
            >
              Войти 
            </button>
            <span>или </span>
            <GoogleLoginButton />
            <p className="text-base-content text-xs"> Нет аккаунта? <b></b>
              <Link to='/registration' className="link-hover text-base-content font-semibold text-xs">Зарегистрироваться</Link>
            </p>
          </div>                
        </div>
      </form>
    </main>
    </>
  );
}
export default LoginPage;