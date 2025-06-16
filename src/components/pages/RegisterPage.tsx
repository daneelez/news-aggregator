import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

interface RegisterProps {
  onRegisterSuccess: (token: string) => void;
}

const RECAPTCHA_SITE_KEY = '6Ld8g2IrAAAAAGWH_2KnqY6d4hBOuXHdy_OWB6ih';

const RegisterPage: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#2C2D30';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setError('Пожалуйста, подтвердите, что вы не робот.');
      return;
    }

    try {
      const response = await axios.post('https://your-api.com/register', {
        login,
        email,
        password,
        captchaToken,
      });
      onRegisterSuccess(response.data.token);
      setError('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Ошибка регистрации');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ошибка регистрации');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-[13%] p-8 bg-[#3A3B3E] rounded-lg shadow-lg flex flex-col gap-4 text-white"
      autoComplete="off"
    >
      <h2 className="text-center text-xl font-semibold">Регистрация</h2>

      <input
        type="text"
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
        className="px-4 py-2 rounded-md bg-[#2C2D30] border border-[#555] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />

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

      <div className="my-2">
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
      >
        Зарегистрироваться
      </button>

      {error && (
        <p className="text-red-400 text-center mt-2">{error}</p>
      )}
    </form>
  );
};

export default RegisterPage;
