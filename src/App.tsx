import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DigestPage from "./components/pages/DigestPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import MainPage from "./components/pages/MainPage.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/digest" element={
                    <DigestPage/>
                }/>
                {/*<Route path="/news" element={<News/>}/>*/}
                {/*<Route path="/settings" element={<Settings/>}/>*/}
                {/* 404 fallback */}
                <Route path="*" element={<div>Страница не найдена</div>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
