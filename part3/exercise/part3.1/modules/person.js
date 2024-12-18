const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)

mongoose.set('strictQuery',false)

mongoose.connect(url).then(result=>{
	console.log('connected successfully')
}).catch(error=>{
	console.log(`error connecting to mongodb: ${error.message}`)
})

const personSchema = new mongoose.Schema({
	name: String,
	number: Number
})

personSchema.set('toJSON',{
	transform: (document,returnedObject)=>{
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person',personSchema)