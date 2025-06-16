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
        captchaToken, // отправляем токен капчи на сервер для проверки
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
    <form onSubmit={handleSubmit} style={formStyle} autoComplete="off">
      <h2 style={{ textAlign: 'center', color: '#E0E0E0' }}>Регистрация</h2>

      <input
        type="text"
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />

      <div style={{ margin: '1rem 0' }}>
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Зарегистрироваться
      </button>

      {error && <p style={errorStyle}>{error}</p>}
    </form>
  );
};

const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '13% auto',
  padding: '2rem',
  borderRadius: '8px',
  backgroundColor: '#3A3B3E',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  fontFamily: 'Arial, sans-serif',
  color: '#E0E0E0',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #555',
  fontSize: '1rem',
  color: '#E0E0E0',
  backgroundColor: '#2C2D30',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const errorStyle: React.CSSProperties = {
  color: '#FF6B6B',
  textAlign: 'center',
  marginTop: '0.5rem',
};

export default RegisterPage;
