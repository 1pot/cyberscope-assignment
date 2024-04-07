import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {GlobalStyles} from './theme/globals.js'

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
