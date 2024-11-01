import {useState} from 'react'

const App = () => {

  // const [clicks, setClicks] = useState({
  //   left:0,
  //   right:0
  // })
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // setTimeout(
  //   ()=>setCounter(counter+1),10000
  // )
  // console.log("rendering....",counter)
  const History= (props)=>{
    if(props.allClicks.length===0){
      return (
        <div>
          this app is used by pressing buttons.
        </div>
      )
    }
    return (
      <div>
        Total button history: {props.allClicks.join('')}
      </div>
    )
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const lc = left+1
    setLeft(lc)
    setTotal(lc + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const rc = right+1
    setRight(rc)
    setTotal(left + rc)
  }

  return (
    <div>
      <Header header={course}/>
      <Content content={course}/>
      <Total total={course}/>
      {left}
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
      {right}
      <History allClicks={allClicks}/>
      <p>total {total}</p>
    </div>
  )
}

const Header = (props)=>{
  return (
    <h1>{props.header.name}</h1>
  )
}
const Content = (props)=>{
  return (
    <div>
      <p>{props.content.parts[0].name} {props.content.parts[0].exercises}</p>
      <p>{props.content.parts[1].name} {props.content.parts[1].exercises}</p>
      <p>{props.content.parts[2].name} {props.content.parts[2].exercises}</p>
    </div>
  )
}
const Total = (props)=>{
  return (
    <p>Number of exercises: {props.total.parts[0].exercises+props.total.parts[1].exercises+props.total.parts[2].exercises}</p>
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