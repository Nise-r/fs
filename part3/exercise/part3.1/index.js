require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

const Person = require('./modules/person')


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
app.get('/api/persons',(request,response,next)=>{
	Person.find({}).then(person=>{
		response.json(person)
	}).catch(error=>next(error))
	// response.json(persons)
})
app.get('/api/info',(request,response,next)=>{
	response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
})
app.get('/api/persons/:id',(request,response,next)=>{
	const id = request.params.id
	// const person = persons.find(p=>p.id===id)
	Person.findById(id).then(person=>{
		if(person) response.json(person)
		else response.status(404).end()
	}).catch(error=>next(error))

	// if(person) response.json(person)
	// else{
	// 	response.status(404).end()
	// }
})
// const generateId=()=>{
// 	const maxId = persons.length>0?Math.max(...persons.map(p=>Number(p.id))):0
// 	return String(maxId+1)
// }
app.post('/api/persons',(request,response,next)=>{
	const body = request.body
	// console.log(body)
	// if(!body) response.status(400).json({'error':'body missing'})
	// else{
	// 	if(!body.number||!body.name) response.status(400).json({'error':'name or number is missing'})
	// 	else if(persons.find(p=>JSON.stringify(p.name)===JSON.stringify(body.name))){
	// 			console.log(persons.find(p=>JSON.stringify(p.name)===JSON.stringify(body.name)))
	// 			response.status(400).json({'error':'name must be unique'})
	// 	}
	// 	else{
	// 		const person = {
	// 			'id':generateId(),
	// 			'name':body.name,
	// 			'number':body.number
	// 		}
	// 		persons = persons.concat(person)
	// 		response.json(person)
	// 	}
		
	// }
	const person = new Person({
		name:body.name,
		number:body.number
	})
	person.save().then(result=>{
		response.json(result)
	}).catch(error=>next(error))
})

app.delete('/api/persons/:id',(request,response,next)=>{
	const id = request.params.id
	// persons = persons.filter(p=>p.id!==id)
	// response.status(204).end()
	Person.findByIdAndDelete(id).then(result=>{
		response.status(204).end()
	}).catch(error=>next(error))
})

app.put('/api/persons/:id',(request,response,next)=>{
	const id = request.params.id
	const person = {
		name: request.body.name,
		number: request.body.number
	}
	Person.findByIdAndUpdate(id,person,{new:true}).then(updatedPerson=>{
		response.json(updatedPerson)
	}).catch(error=>next(error))
})


const errorHandler = (error,request,response,next)=>{
	console.log(error.message)
	if(error.name==='CaseError'){
		return response.status(400).send({error:'malformatted id'})
	}
	next(error)
}
app.use(errorHandler)

const unknownEndpoint = (request,response)=>{
	response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)


const PORT = process.env.PORT||3001
app.listen(PORT,()=>{
	console.log(`Server running on port ${PORT}`)
})