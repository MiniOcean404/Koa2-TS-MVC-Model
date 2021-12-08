#!/usr/bin/env node

import { get_local_ip } from '../src/common/utils'
import http from 'http'
import app from '../src/app'
import debugClass from 'debug'
const debug = debugClass('demo:server')

const port = normalizePort(process.env['PORT'] || '3000')
const host = '0.0.0.0'

// Create HTTP server.
const server = http.createServer(app.callback())

server.listen(port, host, () => {
	console.log(`服务器运行在 http://localhost:${port}`)
	console.log(`服务器运行在 http://${get_local_ip()}:${port}`)
})

server.on('error', onError)
server.on('listening', onListening)

// 将端口规范化为数字、字符串或 false。
function normalizePort(val) {
	const port = parseInt(val, 10)
	// named pipe
	if (isNaN(port)) return val
	// port number
	if (port >= 0) return port
	return false
}

// HTTP 服务器“错误”事件的事件侦听器.
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

// Event listener for HTTP server "listening" event.
function onListening() {
	const address = server.address()
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port
	debug('Listening on ' + bind)
}