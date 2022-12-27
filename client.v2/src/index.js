import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppContextProvider } from './components/AppContext.js'
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
