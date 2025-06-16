import Dropdown from '../Dropdown';
import Tickets from '../Tickets.tsx'
const Home = () => {
  return (
    <div className="min-h-screen bg-[#2C2D30] flex flex-col items-center justify-center gap-6 p-10 text-white">
      <h1 className="text-6xl font-bold text-primary-500 text-center">Home</h1>
      <Dropdown/>
        <Tickets/>
    </div>
  );
};

export default Home;