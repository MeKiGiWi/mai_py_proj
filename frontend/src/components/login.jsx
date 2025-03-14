import axios from "axios";

const login = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

login.interceptors.response.use(
    
)

export default login;