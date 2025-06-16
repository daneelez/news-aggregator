import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext.tsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://your-api.com/login', {
        email,
        password,
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
      style={{
        maxWidth: '400px',
        margin: '15% auto',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Вход</h2>

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

      <button type="submit" style={buttonStyle}>
        Войти
      </button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </form>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  color: '#000',
  backgroundColor: '#fff',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default LoginPage;
