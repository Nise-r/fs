import {useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/person'
import Notification from './components/Notification'
import './index.css'

const Details = ({newFil,persons,setPersons})=>{
    // console.log(persons)
    const deleteHandler= (id)=>{
      const toDel = persons.filter(person=>person.id===id).map(p=>p.name)
      if(window.confirm(`Delete ${toDel}`)){
        const newPerson = persons.filter(person=>person.id!==id).map(p=>p)
        setPersons(newPerson)
        personService.remove(id)
        console.log("deleted "+toDel)
      }   
    }
    if(newFil===''){
      return (
        //buttons should always use function for calling a property otherwise it will cause recursion
        persons.map(person=><p key={person.id}>{person.name} {person.number} <button key={person.id} onClick={()=>deleteHandler(person.id)}>delete</button> </p>)
      )
    }else{
      const arr = persons.filter((person)=>person.name.search(newFil)!==-1)
      return (
          arr.map(pers=><p key={pers.id}>{pers.name} {pers.number} <button key={pers.id} onClick={()=>deleteHandler(pers.id)}>delete</button> </p>)
      )
    }
}


const Filter = ({newFil,setNewFil})=>{
  const filChangeHandler= (event)=>{
    setNewFil(event.target.value)
  }
  return (
    <div>
        filter shown with  
        <input value={newFil} onChange={filChangeHandler}/>
    </div>
  )
}

const App = ()=>{

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFil, setNewFil] = useState('') 
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    personService.getAll().then(data=>{
      setPersons(data)
      // console.log(data)
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFil={newFil} setNewFil={setNewFil}/>
      <h2>add a new</h2>
      <Form persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage}/>
      <h2>Numbers</h2>
      <Details newFil={newFil} persons={persons} setPersons={setPersons}/>
    </div>
  )
}

const Form = ({persons, setPersons,newName, setNewName,newNumber,setNewNumber,setMessage})=>{

  const nameChangeHandler = (event) =>{
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numChangeHandler = (event)=>{
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const submitHandler = (event)=>{
    event.preventDefault()

    let flag = 0
    const toAdd = {
      name: newName,
      number: newNumber      
    }
    persons.forEach((person)=>{
      if(JSON.stringify(person.name)===JSON.stringify(toAdd.name)){
        flag=1
        if(window.confirm(toAdd.name+" is already added to the phonebook, replace the old number with new? ")){
          const toUpdate = persons.filter(person=>JSON.stringify(person.name)===JSON.stringify(toAdd.name)).map(p=>p.id)
          personService.update(toUpdate,toAdd).then(data=>{
            setPersons(persons.map(person=>person.id!==data.id?person:data))
            setNewNumber('')
            setNewName('')
          }).catch(error => {
            // alert(
            //   `the note '${toAdd.name}' was already deleted from server`
            // )
            setMessage(`the note '${toAdd.name}' was already deleted from server`)
            setPersons(persons.filter(person=>JSON.stringify(person.name)!==JSON.stringify(toAdd.name)).map(p=>p))
          })
        }
        // window.alert(toAdd.name+" is already added.")
        // flag=1
      }
    })

    if(!flag){
      // axios.post('http://localhost:3001/persons',toAdd).then(response=>{
      //   setPersons(persons.concat(toAdd))
      //   setNewNumber('')
      //   setNewName('')
      // })
      personService.create(toAdd).then(data=>{
        setPersons(persons.concat(data))
        setNewNumber('')
        setNewName('')
      })
      setMessage(`Added ${toAdd.name}`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
    }
    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
export default App
