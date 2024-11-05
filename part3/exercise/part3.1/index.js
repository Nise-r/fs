const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('tiny'))

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

////middleware--- next is for next middleware or not
// const requestLogger=  (request,response,next)=>{
// 	console.log(`Method: ${request.method}`)
// 	console.log(`Path: ${request.path}`)
// 	console.log(`Body: ${request.body}`)
// 	console.log('---')
// 	next()
// }
// app.use(requestLogger)

app.get('/api/',(request,response)=>{
	response.send('<h1>Hello World</h1>')
})
app.get('/api/persons',(request,response)=>{
	response.json(persons)
})
app.get('/api/info',(request,response)=>{
	response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
})
app.get('/api/persons/:id',(request,response)=>{
	const id = request.params.id
	const person = persons.find(p=>p.id===id)

	if(person) response.json(person)
	else{
		response.status(404).end()
	}
})
const generateId=()=>{
	const maxId = persons.length>0?Math.max(...persons.map(p=>Number(p.id))):0
	return String(maxId+1)
}
app.post('/api/persons',(request,response)=>{
	const body = request.body
	console.log(body)
	if(!body) response.status(400).json({'error':'body missing'})
	else{
		if(!body.number||!body.name) response.status(400).json({'error':'name or number is missing'})
		else if(persons.find(p=>JSON.stringify(p.name)===JSON.stringify(body.name))){
				console.log(persons.find(p=>JSON.stringify(p.name)===JSON.stringify(body.name)))
				response.status(400).json({'error':'name must be unique'})
		}
		else{
			const person = {
				'id':generateId(),
				'name':body.name,
				'number':body.number
			}
			persons = persons.concat(person)
			response.json(person)
		}
		
	}
})

app.delete('/api/persons/:id',(request,response)=>{
	const id = request.params.id
	persons = persons.filter(p=>p.id!==id)
	response.status(204).end()
})

const port = 3001
app.listen(port,()=>{
	console.log(`Server running on port ${port}`)
})