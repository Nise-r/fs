import {useState} from 'react'
import Course from './components/Course'

// const Course = ({course}) =>{
//   // let total = 0
//   // for(let i=0;i<course.parts.length;i++){
//   //   total+=course.parts[i].exercises
//   // }

//   return (
//     <div>
//       <h1>{course.name}</h1>
//       {course.parts.map(part=><p key={part.id}>{part.name} {part.exercises}</p>)}
//       <p>Total of {course.parts.map(part=>part.exercises).reduce((a,c)=>a+c,0)} exercises</p>
//     </div>
//   )
// }

const App = () =>{
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      {courses.map(course=><Course key={course.id} course={course} />).map(prop=>prop)}
    </div>
  )
}

export default App