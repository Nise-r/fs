const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')


userRouter.get('/',async (request,response)=>{
	const user = await User.find({}).populate('blogs',{url:1,title:1,author:1,id:1})
	response.json(user)
})

userRouter.post('/',async (request,response)=>{
	const {username,name, password} = request.body
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password,saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = userRouter