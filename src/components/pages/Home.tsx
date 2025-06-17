import Dropdown from '../Dropdown';
import Tickets from '../Tickets.tsx'
import ChooseSearch from "../ChooseSearch.tsx";
import NewsTicker from "../NewsTicker.tsx";

const Home = () => {
    return (
        <div className="text-white">

            <div className="flex w-full min-h-screen bg-[#2C2D30] p-6 gap-4">
                <div className="w-1/2">
                    <h2 className="ml-5 mt-10 text-5xl font-bold mb-4">График тикеров</h2>

                    <Tickets/>
                </div>
                <div className="w-1/2 mt-10">
                    <div className={'ml-10'}>
                        <h2 className="text-5xl font-bold mb-4">Лента новостей</h2>
                        <ChooseSearch/>

                        <Dropdown/>
                        <div className={'mt-8'}></div>

                        <NewsTicker sentiment={'positive'}/>
                        <NewsTicker sentiment={'negative'}/>

                        <NewsTicker sentiment={'positive'}/>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;