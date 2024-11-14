const Note = require('../models/note')

const initialNotes= [
	{
		content:'HTML is easy',
		important:false
	},
	{
		content:'Browser can only execute javascript',
		important:true
	}
]

const nonExistingId = async ()=>{
	const note = new Note({content:'Will remove soon'})
	await note.save()
	await note.deleteOne()
	return note._id.toString()
}

const notesInDb = async ()=>{
	const note = await Note.find({})
	return note.map(n=>n.toJSON())
}

module.exports = {
	initialNotes,
	nonExistingId,
	notesInDb
}