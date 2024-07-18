// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import {StrictMode} from "react";
import {MenuProvider} from "./utils/useMenuStatus.tsx";

ReactDOM.createRoot(document.getElementById('app')!).render(
    <StrictMode>
        <MenuProvider>
            <App/>
        </MenuProvider>
    </StrictMode>
)
