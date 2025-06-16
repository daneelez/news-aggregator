import { useState } from 'react';


const Tickets = () => {
  const allTickets = new Array(50).fill(null).map((_, i) => `ticket-${i + 1}`);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <div className="min-h-screen bg-[#2C2D30] text-white px-6 py-10">
      <div className="w-1/2">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">⭐ Избранные тикеры</h2>
          <div className="flex flex-wrap gap-3">
            {favorites.length > 0 ? (
              favorites.map((id) => (
                <button
                  key={id}
                  onClick={() => toggleFavorite(id)}
                  className="flex items-center gap-2 border-2 border-yellow-400 font-extrabold text-white bg-black px-8 py-2 rounded-full text-base transition duration-200 hover:bg-yellow-400 hover:text-black"
                >

                  RBSM
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Нет избранных тикеров</p>
            )}
          </div>
        </div>

        {/* Обычные тикеры */}
        <div>
          <h2 className="text-3xl font-bold mb-4">📈 Все тикеры</h2>
          <div className="flex flex-wrap gap-3">
            {allTickets.map((id) => {
              const favorite = isFavorite(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleFavorite(id)}
                  className={`px-6 py-1 rounded-full text-sm font-bold border-2 transition duration-200
                    ${
                      favorite
                        ? 'border-gray-500 text-gray-400 bg-transparent hover:bg-transparent hover:text-gray-300'
                        : 'border-white text-white hover:bg-white hover:text-black'
                    }
                  `}
                >
                  RBSM
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
