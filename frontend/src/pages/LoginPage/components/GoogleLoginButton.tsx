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
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        scope: 'profile email',
        callback: (response) => {
          if (response.access_token) {
            // Отправка токена на сервер
            console.log('Access Token:', response.access_token);
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
