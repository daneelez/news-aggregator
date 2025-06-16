import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/pages/Home.tsx";
import Register from './components/pages/Register.tsx'
import LoginPage from './components/pages/Login.tsx'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                {/*<Route path="/news" element={<News/>}/>*/}
                {/*<Route path="/settings" element={<Settings/>}/>*/}
                {/* 404 fallback */}
                <Route path="*" element={<div>Страница не найдена</div>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
