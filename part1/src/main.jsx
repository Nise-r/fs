// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import ReactDOM from 'react-dom/client'

import App from './App'

//Establish Root for rendering react components, then calls the render method to App.jsx
ReactDOM.createRoot(document.getElementById('root')).render(<App />)