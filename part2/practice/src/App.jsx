import {useState,  useEffect} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    noteService.getAll().then(data=>{
      setNotes(data)
    })
  },[])
  console.log('render',notes.length,' notes')



  const notesToShow = showAll? notes: notes.filter(note => note.important === true)


  const addNotes = (event) =>{
    event.preventDefault()

    const dummyNote = {
      
      content: 'newNote',
      important:Math.random()>0.5
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={()=>setShowAll(!showAll)}>
        show {showAll?'all':'important'}
      </button>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNotes}>
        <input value = {newNote} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
