import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () =>{
	const request = axios.get(url)
	return request.then(response=>response.data)
}

const create = (toAdd)=>{
	const request = axios.post(url,toAdd)
	return request.then(response=>response.data)
}

const remove = (id) =>{
	const request = axios.delete(url+`/${id}`)
	console.log(request)
	// return request.then(response=>response.data) 
}
const update = (id,toAdd)=>{
	const request = axios.put(url+`/${id}`,toAdd)
	return request.then(response=>response.data)
}

export default {getAll,create,remove,update}