// const http = require('http')
require('dotenv').config()

const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.static('dist'))
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
app.get('/api/notes',(request,response,next)=>{
	Note.find({}).then(notes=>{
		response.json(notes)
	}).catch(error=>next(error))
	// response.json(notes)
})
app.get('/api/notes/:id',(request,response,next)=>{
	const id = request.params.id
	// const note = notes.find(n=>n.id===id)

	// if(note) response.json(note)
	// else{
	// 	response.status(404).end()
	// }
	Note.findById(id).then(note=>{
		if(note) response.json(note)
		else response.status(404).end()
	}).catch(error=>next(error))
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response,next) => {
  const body = request.body
  // console.log(body)

  // if (!body.content) {
  //   return response.status(400).json({ 
  //     error: 'content missing' 
  //   })
  // }

  // const note = {
  //   content: body.content,
  //   important: Boolean(body.important) || false,
  //   id: generateId(),
  // }

  // notes = notes.concat(note)

  // response.json(note)
  const note = new Note({
    	content:body.content,
    	important: body.important
    })
  note.save().then(result=>{
  	response.json(result)
  }).catch(error=>next(error))

})
app.put('/api/notes/:id',(request,response,next)=>{
	const body = request.body
	const note = {
		content:body.content,
		important:body.important
	}
	Note.findByIdAndUpdate(request.params.id,note,{new:true}).then(updatedNote=>{
		response.json(updatedNote)
	}).catch(error=>next(error))
})

app.delete('/api/notes/:id',(request,response,next)=>{
	const id = request.params.id
	// const note = notes.filter(n=>n.id!==id)
	// response.status(204).end()
	Note.findByIdAndDelete(id).then(result=>{
		response.status(204).end()
	}).catch(error=>next(error))
})


const errorHandler = (error,request,response,next)=>{
	console.error(error.message)
	if(error.name === 'CaseError'){
		return response.status(400).send({error:'malformatted id'})
	}
	next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request,response)=>{
	response.status(404).send({error:'unknown endpoint.'})
}
app.use(unknownEndpoint)

const PORT =process.env.PORT||3001
app.listen(PORT,()=>{
	console.log(`Server running on port ${PORT}`)
})

// const app = http.createServer((request,response)=>{
// 	response.writeHead(200,{'Content-Type':'application/json'})
// 	response.end(JSON.stringify(notes))
// })
