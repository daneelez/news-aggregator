import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/pages/Home.tsx";
import DigestPage from "./components/pages/DigestPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/digest" element={
                    <ProtectedRoute>
                        <DigestPage/>
                    </ProtectedRoute>
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
