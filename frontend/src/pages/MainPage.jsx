import { useEffect, useContext } from "react"
import AuthContext from "../components/AuthContext"

export default function MainPage(){
    const auth = useContext(AuthContext);
    useEffect(() => {console.log(`isAuth = ${auth.isAuth}`)}, [auth.isAuth])
    return (
        <>
            <h1 className="text-3xl font-semibold">WELCOME</h1>
        </>
    )
}