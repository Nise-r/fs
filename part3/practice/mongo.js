const mongoose = require('mongoose')

if(process.argv.length<3){
	console.log('give password as argument')
	process.exit(1)
}

const cont = process.argv[3]
const imp = process.argv[4]

const password = process.argv[2]

const url =`mongodb+srv://fullstack:${password}@cluster0.gkqhu.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
})

const Note = mongoose.model('Note',noteSchema)

const note = new Note({
	content:cont,
	important:imp
})

// note.save().then(result=>{
// 	console.log('Note saved!')
// 	mongoose.connection.close()
// })
Note.find({}).then(result=>{
	result.forEach(note=>{
		console.log(note)
	})
	mongoose.connection.close()
})