import axios from 'axios';
import { useEffect } from 'react';
import GoogleIcon from '@/components/GoogleIcon';

export default function GoogleLoginButton() {
  useEffect(() => {
    // Загрузка Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Инициализация Google Auth
      const client = google.accounts.oauth2.initTokenClient({
        client_id: `${import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}`,
        scope: 'profile email',
        callback: async (response) => {
          if (response.access_token) {
            // Отправка токена на сервер
            try {
              const { data } = await axios.post(
                'http://localhost:8000/api/google/auth/',
                { access_token: response.access_token },
              );
              localStorage.setItem('google_access_token', data.access_token);
            } catch (error) {
              console.error('Auth failed:', error);
            }
            // Здесь можно добавить логику авторизации
          }
        },
      });
      client.requestAccessToken();
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline w-full gap-2 btn-neutral flex justify-center items-center mt-1 mb-1"
    >
      <GoogleIcon />
      Войти через Google
    </button>
  );
}
