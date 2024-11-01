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

let counter = 1

// const refresh = () => {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App counter={counter} />
//   )
// }

//Establish Root for rendering react components, then calls the render method to App.jsx
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// setInterval(()=>{
//   refresh()
//   counter+=1
// },1000)

// counter+=1
// console.log(counter)
// refresh()
// console.log(counter)