import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blog'

let token = null

const setToken = newToken =>{
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (toAdd)=>{
  const config = {
    headers: {Authorization:token}, 
  }

  const request = await axios.post(baseUrl,toAdd,config)
  return request.data
}
export default { getAll, create ,setToken}