// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header header={course}/>
      <Content content={part1} total={exercises1}/>
      <Content content={part2} total={exercises2}/>
      <Content content={part3} total={exercises3}/>
      <Total total={exercises3+exercises1+exercises2}/>
    </div>
  )
}

const Header = (props)=>{
  return (
    <h1>{props.header}</h1>
  )
}
const Content = (props)=>{
  return (
    <p>{props.content} {props.total}</p>
  )
}
const Total = (props)=>{
  return (
    <p>Number of exercises: {props.total}</p>
  )
}


//The first letter of react component name must be capitalized
// const App = () => {
//   const now = new Date()
//   const a = 10
//   const b = 10
//   console.log(now,a+b)
//   return (
//     <div>
//       <p>Hello world, it is now {now.toString()}</p>
//       <p>{a}+{b}={a+b}</p>
//       <Hello name="George" age="34"/>
//       <Hello name="seigi no mikata" age="17"/>
//     </div>
//   )
// }


const Hello=(prop)=>{
  return (
    <div>Hello {prop.name}, you've just turned {prop.age}</div>
    )
}

//which component to be used as default
export default App