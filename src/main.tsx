import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import {registerSW} from "virtual:pwa-register";
import './i18n/i18n.ts';
import {HashRouter} from "react-router-dom";

registerSW({immediate: true});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <App/>
        </HashRouter>
    </StrictMode>
)
