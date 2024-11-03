const Course = ({course}) =>{
  // let total = 0
  // for(let i=0;i<course.parts.length;i++){
  //   total+=course.parts[i].exercises
  // }

  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part=><p key={part.id}>{part.name} {part.exercises}</p>)}
      <p>Total of {course.parts.map(part=>part.exercises).reduce((a,c)=>a+c,0)} exercises</p>
    </div>
  )
}

export default Course