import { useState, useEffect, useRef } from "react"
import { Link } from "react-router"
import AuthContext from "./AuthContext"
import { useContext } from "react"
import PlanItTag from "./PlanItTag"

export default function NavBarForHP() {
  const { isAuth, logout } = useContext(AuthContext)
  const [top, setTop] = useState(0)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY.current && currentScrollY > 50) {
        setTop(-88) // Hide navbar while scrolling down
      } else {
        setTop(0) // Show navbar while scrolling up 
      }

      prevScrollY.current = currentScrollY

      // Always show navbar on top of the page
      if (currentScrollY === 0) setTop(0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // CSS styles for smooth animation
  const navbarStyles = {
    top: `${top}px`,
    transition: "top 0.3s ease-in-out",
  }

  return (
    <>
      {isAuth ? (
        <div
          className="navbar fixed left-0 right-0 
            bg-gradient-to-b from-[rgba(15,15,15,0.05)] to-transparent 
            backdrop-blur-xs shadow-lg px-8 h-22 z-50"
          style={navbarStyles}
        >
          <div className="flex-1">
            <Link to={"/"}>
              <PlanItTag />
            </Link>
          </div>
          <div className="avatar">
            <div className="w-15 rounded-full border border-base-300">
              <Link to={"/main"} className="rounded-full">
                <svg
                  className="absolute pr-4 mt-1 p text-neutral"
                  fill="currentColor"
                  height="45px"
                  width="75px"
                  viewBox="0 0 512 512"
                >
                  {/* Иконка профиля */}
                </svg>
              </Link>
            </div>
          </div>
          <div className="ml-0.5 flex mt-3 text-accent">
            <button
              onClick={logout}
              className="btn btn-ghost btn-circle w-8 px-1 mx-1 mt-1.5"
            >
              <svg
                fill="currentColor"
                height="800px"
                width="800px"
                viewBox="0 0 471.2 471.2"
              >
                {/* Иконка выхода */}
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div
          className="navbar fixed left-0 right-0 
            bg-gradient-to-b from-[rgba(15,15,15,0.5)] to-[rgba(15,15,15,0.001)] 
            backdrop-blur-xs shadow-lg px-8 h-22 z-50"
          style={navbarStyles}
        >
          <div className="flex-1">
            <Link to="/">
              <PlanItTag />
            </Link>
          </div>
          <div className="flex-none">
            <Link to={"/login"} className="btn btn-neutral">
              Войти
            </Link>
          </div>
        </div>
      )}
    </>
  )
}