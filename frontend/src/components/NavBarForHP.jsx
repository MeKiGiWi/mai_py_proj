import { Link } from "react-router"
import AuthContext from "./AuthContext"
import { useContext } from "react"
import PlanItTag from "./PlanItTag";


export default function NavBarForHP () {
  const { isAuth, logout } = useContext(AuthContext);

  return ( 
    <>
    {isAuth ? (
        <>
      <div className="flex-1">
        <Link to={'/'}>
          <PlanItTag/>
        </Link>
      </div>
      </>
    ) : (

    <div className="navbar bg-base-100 shadow-lg px-8 h-22">
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