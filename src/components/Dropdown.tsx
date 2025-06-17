import { useState, useRef, useEffect } from 'react';
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

  return (
    <div ref={menuRef} className="fixed top-15 right-5 z-[1000] inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-0 border-none bg-transparent cursor-pointer focus:outline-none"
        aria-label="Меню"
      >
        <img
          src="/icons/application-menu.svg"
          alt="Меню"
          className="w-12 h-12"
        />
      </button>

      <div
        className={`absolute top-full right-0 mt-2 min-w-[160px] rounded-md bg-[#3A3B3E] shadow-lg overflow-hidden transform transition-all duration-200 origin-top-right ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <Link
          to="/profile"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-2 text-[#E0E0E0] hover:bg-[#555] transition-colors duration-200"
        >
          <img src="/icons/profile.svg" alt="Профиль" className="w-6 h-6 filter invert" />
          Профиль
        </Link>
        <Link
          to="/login"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-2 text-[#E0E0E0] hover:bg-[#555] transition-colors duration-200"
        >
          <img src="/icons/login.svg" alt="Вход" className="w-6 h-6 filter invert" />
          Вход
        </Link>
        <Link
          to="/register"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-2 text-[#E0E0E0] hover:bg-[#555] transition-colors duration-200"
        >
          <img src="/icons/reg.svg" alt="Регистрация" className="w-6 h-6 filter invert" />
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
