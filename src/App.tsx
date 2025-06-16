import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/pages/Home.tsx";
import RegisterPage from './components/pages/RegisterPage.tsx'
import LoginPage from './components/pages/LoginPage.tsx'
import ProfilePage from './components/pages/ProfilePage.tsx'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                {/*<Route path="/news" element={<News/>}/>*/}
                {/*<Route path="/settings" element={<Settings/>}/>*/}
                {/* 404 fallback */}
                <Route path="*" element={<div>Страница не найдена</div>}/>
            </Routes>
        </BrowserRouter>
    )
}


