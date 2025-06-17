import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './components/pages/RegisterPage.tsx'
import LoginPage from './components/pages/LoginPage.tsx'
import ProfilePage from './components/pages/ProfilePage.tsx'
import MainPage from "./components/pages/MainPage.tsx";
import SettingsPage from "./components/pages/SettingsPage.tsx";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="*" element={<div>Страница не найдена</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
