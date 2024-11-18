import {useState,  useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)

  //use effect runs once in lifetime of website, usestate render everytime state changes
  useEffect(()=>{
    noteService.getAll().then(data=>{
      setNotes(data)
    })
  },[])
  console.log('render',notes.length,' notes')


  useEffect(()=>{
    const loggedUserJson =window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  })


  const notesToShow = showAll? notes: notes.filter(note => note.important === true)


  const addNotes = (event) =>{
    event.preventDefault()

    const dummyNote = {
      
      content: newNote,
      important:false
    }

    noteService
      .create(dummyNote)
      .then(data => {
        setNotes(notes.concat(data))
        setNewNote('')
      })
    
  }
  const toggleImportanceOf= (id)=>{
    // console.log('importance of ' +id+' needs to be toggled.')
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n=>n.id===id)
    const changedNote = {...note,important:!note.important}

    // axios.put(url,changedNote).then(response=>{
    //   // console.log(response.data)
    //   // console.log(changedNote)
    //   setNotes(notes.map(n=>n.id===id?response.data:n))
    // })
    noteService
      .update(id, changedNote)
      .then(data => {
        setNotes(notes.map(note => note.id === id ? data : note))
    })
      .catch(error => {
        setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  const handleNoteChange = (event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const formHandler = (event)=>{
    event.preventDefault()
    console.log(`logging with ${username} ${password}`)
  }
  const handleLogin =  async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){

      setErrorMessage('Wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)},5000)
    }
  }
  const loginForm = ()=>{
    return <div>
        <form onSubmit={handleLogin}>
          <div>Username: <input type='text' value={username} onChange={({target})=>{setUsername(target.value)}}/></div>
          <div>Password: <input type='password' value={password} onChange={({target})=>{setPassword(target.value)}}/></div>
          <button type="submit">login</button>
        </form>
      </div>
  }
  const noteForm = ()=>{
    return <div>
      <form onSubmit={addNotes}>
          <input value = {newNote} onChange={handleNoteChange}/>
          <button type="submit">Save</button>
      </form>
    </div>
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }
      <button onClick={()=>setShowAll(!showAll)}>
        show {showAll?'all':'important'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App
