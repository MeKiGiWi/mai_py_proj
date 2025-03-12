import { Outlet, Navigate } from "react-router";

export default function ProtectedRoute(){
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    console.log(accessToken);
    if (!accessToken && refreshToken)
    {
        console.log('access token ends');
    }
    return accessToken ? <Navigate to="/login" replace/> : <Navigate to="/login" replace/>
}