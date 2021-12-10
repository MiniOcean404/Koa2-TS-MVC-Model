#!/usr/bin/env node

import { get_local_ip } from '@/common/utils'
import http from 'http'
import app from '../src/app'

const port = normalizePort(process.env['PORT'] || '3000')

// Create HTTP server.
const server = http.createServer(app.callback())

server.listen(port, () => {
	console.log(`服务器运行在 http://localhost:${port}`)
	console.log(`服务器运行在 http://${get_local_ip()}:${port}`)
})

server.on('error', onError)

// 将端口规范化为数字、字符串或 false。
function normalizePort(val: string) {
	const port = parseInt(val, 10)
	// named pipe
	if (isNaN(port)) return val
	// port number
	if (port >= 0) return port
	return false
}

// HTTP 服务器“错误”事件的事件侦听器.
function onError(error: { syscall: string; code: string }) {
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
