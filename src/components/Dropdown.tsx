import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItemStyle: React.CSSProperties = {
    display: 'block',
    padding: '10px 16px',
    color: '#E0E0E0',
    textDecoration: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',  // Фиксируем контейнер в углу экрана
        top: 20,
        right: 20,
        zIndex: 1000,
        display: 'inline-block',
      }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          outline: 'none',
        }}
        aria-label="Меню"
      >
        <img
          src="/icons/application-menu.svg"
          alt="Меню"
          style={{ width: 36, height: 36 }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%', // под иконкой
            right: 0,
            marginTop: 8,
            backgroundColor: '#3A3B3E',
            borderRadius: 6,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
            minWidth: 140,
          }}
        >
          <Link
            to="/login"
            style={menuItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#555')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            onClick={() => setOpen(false)}
          >
            Вход
          </Link>
          <Link
            to="/register"
            style={menuItemStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#555')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            onClick={() => setOpen(false)}
          >
            Регистрация
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
