// const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(request,response)=>{
	response.send('<h1>Hello World</h1>')
})
app.get('/api/notes',(request,response)=>{
	response.json(notes)
})
app.get('/api/notes/:id',(request,response)=>{
	const id = request.params.id
	const note = notes.find(n=>n.id===id)

	if(note) response.json(note)
	else{
		response.status(404).end()
	}
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id',(request,response)=>{
	const id = request.params.id
	const note = notes.filter(n=>n.id!==id)
	response.status(204).end()
})

const port =3001
app.listen(port,()=>{
	console.log(`Server running on port ${port}`)
})

// const app = http.createServer((request,response)=>{
// 	response.writeHead(200,{'Content-Type':'application/json'})
// 	response.end(JSON.stringify(notes))
// })

// const port = 3001
// app.listen(port)
// console.log(`Server running on port ${port}`)