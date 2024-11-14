const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = (request)=>{
  const authorization = request.get('authorization')
  if(authorization.includes('Bearer ')){
    return authorization.replace('Bearer ','')
  }
  return null
}

blogRouter.get('/', async (request, response,next) => {

  const blog = await Blog.find({}).populate('user',{username:1,name:1,id:1})
  response.json(blog)
})

blogRouter.post('/', async (request, response,next) => {
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(!decodedToken.id) return response.status(401).json({error:"invalid token"})

  const user = await User.findById(decodedToken.id)

  const body = request.body
  const blog = new Blog({
    url:"https://localhost:3001/api/blogs/"+body.title,
    title: body.title,
    author: body.author,
    user:user.id,
    likes:body.likes,
  })

  const savedBlog = await blog.save()

  // const user = await User.findById(body.user)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  
  response.status(201).json(savedBlog)
})
blogRouter.delete('/:id',async (request,response)=>{
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(!decodedToken.id) return response.status(401).json({error:"invalid token"})

  const id = request.params.id
  const blog = await Blog.findById(id)
  if(blog===null) response.status(401).json({error:"resource doesn't exist"}).end()
  else if(blog.user.toString()===decodedToken.id.toString()){
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  else response.status(401).json({error:"only the owner of blog can delete it."})
})

module.exports = blogRouter

