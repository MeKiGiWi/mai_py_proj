import { Link } from "react-router"
import AuthContext from "./AuthContext"
import { useContext } from "react"
import PlanItTag from "./PlanItTag";

export default function NavBar () {
  const { isAuth, logout } = useContext(AuthContext);

  return ( 
    <>
    {isAuth ? (
    <div className="navbar bg-base-100 shadow-lg px-8">
      <div className="flex-1">
        <Link to={'/'}>
          <PlanItTag/>
        </Link>
      </div>
      <div className="avatar">
        <div className="w-20 rounded-full border border-base-300">
          <Link 
          to={"/main"}
          className="rounded-full"
          >
          <svg 
          className="absolute pr-4 mt-1 p text-neutral"
          fill="currentColor" height="65px" width="95px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 512 512" xml:space="preserve">
            <g>
              <g>
                <circle cx="256" cy="114.526" r="114.526"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421
                  c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z"/>
              </g>
            </g>
          </svg>
          </Link>
        </div>
      </div>
      <div className="ml-3 flex mt-4.5 text-accent">
        <button
        onClick={logout}
        className="btn btn-ghost"
        >
          <svg fill="#000000" height="28px" width="28px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 471.2 471.2" xml:space="preserve">
          <g>
            <g>
              <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5
                s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5
                S235.019,444.2,227.619,444.2z"/>
              <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5
                s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8
                C455.319,239.9,455.319,231.3,450.019,226.1z"/>
            </g>
          </g>
          </svg>
        </button>
      </div>
    </div>) : (
    <div className="navbar bg-base-100 shadow-lg px-8">
      <div className="flex-1">
        <Link>
          <PlanItTag/>
        </Link>
      </div>
      <div className="flex-none">
        <Link to={"/login"} className="btn btn-neutral">Войти</Link>
      </div>
    </div> 
  ) 
  }
  </>
  )
}