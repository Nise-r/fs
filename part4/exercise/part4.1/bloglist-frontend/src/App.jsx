import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [author,setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }


  const [user,setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    const user = window.localStorage.getItem('loggedUser')
    if(user){
      setUser(JSON.parse(user))
      blogService.setToken(JSON.parse(user).token)
    }
  },[])

  const userHandler = (e)=>{
    console.log(e.target.value)
    setUsername(e.target.value)
  }
  const passHandler = (e)=>{
    setPassword(e.target.value)
  }
  const authorHandler = (e)=>{
    setAuthor(e.target.value)
  }
  const titleHandler = (e)=>{
    setTitle(e.target.value)
  }
  const urlHandler = (e)=>{
    setUrl(e.target.value)
  }

  const submitHandler = async (event) =>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))

      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)
    }catch(exception){
      console.log('wrong credentials')
    }

  }
  const logout =  ()=>{
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const blogHandler = async (event)=>{
    // console.log(1)
    event.preventDefault()
    try{
      const toAdd = {
        title,
        author,
        url
      }

      const newBlog = await blogService.create(toAdd)
      setBlogs(blogs.concat(newBlog))
    }catch(exception){
      console.log(exception)

    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {user==null?
        <div>
          <div style= {hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}><p>login to the application</p>
          <form onSubmit={submitHandler}>
            <p>Username: <input onChange={(e)=>userHandler(e)} type='string'/></p>
            <p>Password: <input onChange={(e)=>passHandler(e)} type='string'/></p>
            <button type='submit'>Login</button>
          </form>
          <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
        :<p>welcome, {user.name} <button onClick={()=>logout()}>logout</button></p>}
        {user==null?'':
        <div><p>Create new</p>
          <form onSubmit={blogHandler}>
            <p>title:<input type='string' onChange={(e)=>titleHandler(e)}/></p>
            <p>author:<input type='string' onChange={(e)=>authorHandler(e)}/></p>
            <p>url:<input type='string' onChange={(e)=>urlHandler(e)} /></p>
            <button type='submit'>Create</button>
          </form>
          
          </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App