import { Link } from "react-router"
import AuthContext from "./AuthContext"
import { useContext } from "react"
import PlanItTag from "./PlanItTag";

export default function NavBar () {
  const { isAuth } = useContext(AuthContext);

  return ( 
    <>
    {isAuth ? (
    <div className="navbar bg-base-100 shadow-lg px-8">
      <div className="flex-1">
        <Link>
          <PlanItTag/>
        </Link>
      </div>
      <div className="avatar">
        <div className="w-20 rounded-full border border-base-300">
          <Link to={"/main"}>eto logo <br/> sosite tipo</Link>
        </div>
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