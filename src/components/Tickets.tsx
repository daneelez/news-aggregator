import { useState } from 'react';

const Tickets = () => {
  const allTickets = new Array(50).fill(null).map((_, i) => `ticket-${i + 1}`);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <div className="min-h-full text-white px-6 py-10">
      {/* Избранные тикеты */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-4">⭐ Избранные тикеры</h2>
        <div className="flex flex-wrap gap-3">
          {favorites.length > 0 ? (
            favorites.map((id) => (
              <button
                key={id}
                onClick={() => toggleFavorite(id)}
                className="w-35 border-2 border-yellow-400 font-extrabold text-white bg-black px-3 py-2 rounded-full text-base transition duration-200 hover:bg-yellow-400 hover:text-black"
              >
                RBSM
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Нет избранных тикеров</p>
          )}
        </div>
      </div>

      {/* Все тикеты */}
      <div>
        <h2 className="text-3xl font-bold mb-4">📈 Все тикеры</h2>
        <div className="flex flex-wrap gap-3">
          {allTickets.map((id) => {
            const favorite = isFavorite(id);
            return (
              <button
                key={id}
                onClick={() => toggleFavorite(id)}
                className={`w-30 px-3 py-2 text-sm font-bold border-3 rounded-full transition duration-200
                  ${
                    favorite
                      ? 'border-white text-white hover:bg-white hover:text-black'
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
  );
};

export default Tickets;
