import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useAuth } from '../../services/AuthContext.tsx';

const RECAPTCHA_SITE_KEY = '6Ld8g2IrAAAAAGWH_2KnqY6d4hBOuXHdy_OWB6ih';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.backgroundColor = '#2C2D30';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleLogin = async () => {
    if (!captchaToken) {
      setError('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    try {
      const response = await axios.post('https://your-api.com/login', {
        email,
        password,
        captchaToken,
      });

      const token = response.data.token;
      login(token);
      setError('');
      navigate('/digest');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Ошибка входа');
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="max-w-md mx-auto mt-[15%] p-8 bg-[#3A3B3E] rounded-lg shadow-lg flex flex-col gap-4 text-white"
      autoComplete="off"
    >
      <h2 className="text-center text-xl font-semibold">Вход</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-4 py-2 rounded-md bg-[#2C2D30] border border-[#555] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="px-4 py-2 rounded-md bg-[#2C2D30] border border-[#555] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="my-2 mt-4 ml-1">
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
      >
        Войти
      </button>

      {error && <p className="text-red-400 text-center mt-2">{error}</p>}
    </form>
  );
};

export default LoginPage;
