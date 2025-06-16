import React, { useEffect } from 'react';

interface UserProfileProps {
  username: string;
  email: string;
  avatarUrl?: string;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, email, avatarUrl, onLogout }) => {
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#2C2D30';

    return () => {

      document.body.style.backgroundColor = prevBg || '';
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-55 p-6 bg-[#3A3B3E] rounded-lg shadow-lg text-[#E0E0E0] font-sans overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full border-2 border-[#4CAF50] overflow-hidden">
        </div>
        <h1 className="text-2xl font-semibold">{username}</h1>
        <p className="text-sm text-gray-400">{email}</p>
      </div>

      <button
        onClick={onLogout}
        className="mt-8 w-full bg-[#4CAF50] hover:bg-green-600 transition-colors duration-300 text-white py-3 rounded-md font-medium"
      >
        Выйти
      </button>
    </div>
  );
};

export default UserProfile;
