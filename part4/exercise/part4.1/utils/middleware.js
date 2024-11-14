const logger = require('./logger')

const requestLogger = (request,response,next)=>{
	logger.info('Method: ',request.method)
	logger.info('Path: ',request.path)
	logger.info('Body: ',request.body)
	logger.info('---')
	next()
}
const tokenExtractor = (request,response,next)=>{
	const authorization = request.get('authorization')
	let token  = null
	if(authorization!=null&&authorization.includes('Bearer ')){
	   token =  authorization.replace('Bearer ','')
	}
	request.token = token
	next()
}
const unknownEndpoint = (request,response)=>{
	response.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (error, request,response,next)=>{
	logger.error(error.message)
	if(error.name ==='CaseError'){
		response.status(400).send({error:'malformatted id'})
	}else if(error.name ==='ValidationError'){
		response.status(400).send({error:error.message})
	}
	next(error)
}

module.exports = {
	requestLogger,
	tokenExtractor,
	unknownEndpoint,
	errorHandler
}