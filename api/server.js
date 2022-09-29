// build your server here and require it from index.js
const express = require('express')
const resourcesRouter = require('./resource/router')
const projectRouter = require('./project/router')
const taskRouter = require('./task/router')

const server = express()

server.use(express.json())

server.use('/api', resourcesRouter)
server.use('/api', projectRouter)
server.use('/api', taskRouter)

server.use('*', (req, res) => {
    res.json({ api: 'up' })
})

module.exports = server

