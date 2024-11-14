//contains all routes of api

const noteRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

// noteRouter.get('/',(request,response)=>{
// 	response.send('<h1>Hello World</h1>')
// })

const getTokenFrom = request =>{
	const authorization = request.get('authorization')
	if(authorization && authorization.startsWith('Bearer ')){
		return authorization.replace('Bearer ','')
	}
	return null
}

noteRouter.get('/',async (request,response)=>{
	const note = await Note.find({}).populate('user',{username:1,name:1})
	response.json(note)
})

noteRouter.get('/:id',(request,response,next)=>{
	const id = request.params.id

	Note.findById(id).then(note=>{
		if(note) response.json(note)
		else response.status(404).end()
	}).catch(error=>next(error))
})


noteRouter.post('/', async (request, response,next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
  if(!decodedToken.id){
  	return response.status(401).json({error:'token invalid'})
  }
  const user = await User.findById(decodedToken.id)
  
  //decoded token contain username, id and iat
  const note = new Note({
    	content:body.content,
    	important: body.important,
    	user:user.id
    })
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)

})
noteRouter.put('/:id',(request,response,next)=>{
	const body = request.body
	const note = {
		content:body.content,
		important:body.important
	}
	Note.findByIdAndUpdate(request.params.id,note,{new:true}).then(updatedNote=>{
		response.json(updatedNote)
	}).catch(error=>next(error))
})

noteRouter.delete('/:id',(request,response,next)=>{
	const id = request.params.id
	Note.findByIdAndDelete(id).then(result=>{
		response.status(204).end()
	}).catch(error=>next(error))
})

module.exports = noteRouter