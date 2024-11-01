import {useState} from 'react'


const Button = ({action,text}) =>{
  return (
    <button onClick={action}>{text}</button>
  )
}

const Statistics = ({good,neutral,bad})=>{
  const StatisticsLine = ({text,value})=>{
    return (
      
        <tr><td>{text}</td><td> {value}</td></tr>
      
    )
  }
  if(good===0 && bad===0 && neutral===0)
   return (
    <div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  return (
    <div>
      <h2>Statistics</h2>
      <table>
      <tbody>
      <StatisticsLine text='good' value={good}/>
      <StatisticsLine text='neutral' value={neutral}/>
      <StatisticsLine text='bad' value={bad}/>
      <StatisticsLine text='all' value={good+bad+neutral}/>
      <StatisticsLine text='average' value={(good-bad)/(good+neutral+bad)}/>
      <StatisticsLine text='positive' value={(good/(good+neutral+bad))*100+'%'}/>
      </tbody> 
      </table>
    </div>
  )
}

const App = () => {
  const [good,setGood]  = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes,setVote] = useState(Array(8).fill(0))

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  
  const GoodHandler= ()=>{
      const newGood = good+1
      setGood(newGood)
      console.log("good=",good)
  }
  const NeutralHandler= ()=>{
      const newNeutral = neutral+1
      setNeutral(newNeutral)
      console.log("neutral=",neutral)
  }
  const BadHandler= ()=>{
      const newBad = bad+1
      setBad(newBad)
      console.log("bad=",bad)
  }

  const RandomAnec = () =>{
    let anec=selected
    while(anec>7 || anec===selected){
      anec = Math.floor(Math.random()*10)
    }
    setSelected(anec)
    console.log("Random ",anec)
  }

  const VoteAnec= ()=>{
    const newVote = [...votes]
    newVote[selected]+=1
    setVote(newVote)
  }

  const MostVotedAnec = () =>{
    let most = 0
    let max = 0
    for(let i=0;i<8;i++){
      if(votes[i]>max){
        max = votes[i]
        most = i
      }
    }
    return (
      <div>
        <p>{anecdotes[most]}</p>
        <p>has {votes[most]} votes</p>
      </div>
    )
  }

  return (
    <div>
    <h1>Give Feedback</h1>
    <Button action={GoodHandler} text='good'/>
    <Button action={NeutralHandler} text='neutral'/>
    <Button action={BadHandler} text='bad'/>

    <Statistics good={good} bad={bad} neutral={neutral}/>

    <h2>Anecdote of the day</h2>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
    <Button action={VoteAnec} text='vote'/>
    <Button action={RandomAnec} text='next anecdote'/>

    <h2>Anecdote with most votes</h2> 
    <MostVotedAnec/>
    </div>
  )
}

export default App
