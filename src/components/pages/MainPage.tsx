import ChartSection from "../sections/ChartSection"
import NewsSection from "../sections/NewsSection"
import Dropdown from "../ui/Dropdown.tsx";


const MainPage = () => {
    return (
        <div className="flex h-screen bg-neutral-900 text-white">
            <ChartSection/>
            <NewsSection/>
            <Dropdown/>
        </div>
    );
}

export default MainPage
