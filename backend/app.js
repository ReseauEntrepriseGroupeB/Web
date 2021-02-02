import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import routes from './src/routes'
import helmet from 'helmet'
import env from './src/config/environment'
import express_server from './src/index'

const addRequestId = require('express-request-id')()

const server = new express_server(express)

server
  .initDatabase()
  .addMiddleware(cors())
  .addMiddleware(bodyParser.json())
  .addMiddleware(addRequestId)
  .helmetSecurity(helmet)
  .passportConfig(passport)
  .serveStaticFiles()
  .addRouting(routes)
  .errorHandler()
  .listenOn(env.PORT ?? 8001)

export default server.run()
