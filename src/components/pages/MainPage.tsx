import ChartSection from "../sections/ChartSection"
import NewsSection from "../sections/NewsSection"
import Dropdown from "../ui/Dropdown.tsx";


const MainPage = () => {
    return (
        <div className="flex flex-row w-md:flex-col h-screen text-text">
            <ChartSection/>
            <NewsSection/>
            <Dropdown/>
        </div>
    );
}

export default MainPage
