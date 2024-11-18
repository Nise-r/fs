import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate
} from 'react-router-dom'
import {useField} from './hooks/index'
import { Table ,Form ,Button} from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
      <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create-new">Create new</Link>
          <Link style={padding} to="/about">about</Link>
      </div>

  )
}

const AnecdoteList = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(p=>p.id === Number(id))
  if(anecdote){
    return (
      <div>
        <h1>{anecdote.content} by {anecdote.author}</h1>       
        <p>has {anecdote.votes}</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p> 
      </div>
    )
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <Table striped>
        <tbody>
        {anecdotes.map(anecdote => <tr key={anecdote.id} ><td key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></td></tr>)}
        </tbody>
      </Table>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content :content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
    navigate('/')
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control name='content'  type= {content.type} value={content.value} onChange={content.onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control name='author' type= {author.type} value={author.value} onChange={author.onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url for more info</Form.Label>
          <Form.Control name='info' type= {info.type} value={info.value} onChange={info.onChange} />
        </Form.Group>
        <Button type="submit">create</Button>
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className='container'>
      <h1>Software anecdotes</h1>
      {/*<Menu />*/}
      {/*<AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />*/}
      <Router>
        {/*<div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create-new">Create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>*/}
        <Menu />
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
          <Route path="/create-new" element={<CreateNew addNew={addNew}/>}/>
          <Route path="/about" element={<About />}/>
          <Route path="/anecdotes/:id" element={<AnecdoteList anecdotes={anecdotes}/>}/>
        </Routes>
        <div>
          <Footer/>
        </div>
      </Router>
    </div>
  )
}

export default App
