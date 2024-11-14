const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersInDb = async ()=>{
	const users = await User.find({})
	return users.map(u=>u.toJSON())
}

describe('when there is one user in db',()=>{
	beforeEach(async ()=>{
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('sekret',10)
		const user = new User({
			username:'root',
			passwordHash
		})
		await user.save()
	})

	test('creation succeeds with fresh username',async ()=>{
		const userAtStart = await helper.usersInDb()
		const newUser = {
			username:'raj',
			name:'raj',
			password:'secret'
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type',/application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length,userAtStart.length+1)

		const usernames = usersAtEnd.map(name=>name.username)
		assert(usernames.includes(newUser.username))

	})
})


