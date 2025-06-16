import React, { useState } from 'react';
import axios from 'axios';

interface RegisterProps {
  onRegisterSuccess: (token: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api.com/register', {
        login,
        email,
        password,
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
      style={{
        maxWidth: '400px',
        margin: '13% auto',
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
      <h2 style={{ textAlign: 'center' }}>Регистрация</h2>

      <input
        type="text"
        placeholder="Логин"
        value={login}
        onChange={e => setLogin(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Зарегистрироваться
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

export default Register;
