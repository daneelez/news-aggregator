import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/pages/Home.tsx";
import RegisterPage from './components/pages/RegisterPage.tsx'
import ProfilePage from './components/pages/ProfilePage.tsx'
import DigestPage from "./components/pages/DigestPage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import MainPage from "./components/pages/MainPage.tsx";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/digest" element={
                    <DigestPage/>
                }/>
                <Route path="*" element={<div>Страница не найдена</div>}/>
            </Routes>
        </BrowserRouter>
    )
}


