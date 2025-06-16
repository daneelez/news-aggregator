import ChartSection from "../sections/ChartSection"
import NewsSection from "../sections/NewsSection"

const MainPage = () => {
    return (
        <div className="flex h-screen bg-neutral-900 text-white">
            <ChartSection/>
            <NewsSection/>
        </div>
    );
}

export default MainPage
