import "/src/assets/scss/main.scss"
import {createRoot} from 'react-dom/client'
import App from "/src/App.jsx"

let container = null

document.addEventListener('DOMContentLoaded', function(event) {
    if (container) return
    container = document.getElementById('root')
    createRoot(container).render(<App />)
})
