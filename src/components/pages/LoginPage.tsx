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
        captchaToken, // отправляем токен капчи на сервер
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
      style={formStyle}
      autoComplete="off"
    >
      <h2 style={{ textAlign: 'center', color: '#E0E0E0' }}>Вход</h2>

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
        Войти
      </button>

      {error && <p style={errorStyle}>{error}</p>}
    </form>
  );
};

const formStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '15% auto',
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

export default LoginPage;
