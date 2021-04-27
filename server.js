const WebSocket = require('ws')

class Server{
	constructor(config){
		this.server = new WebSocket.Server( config, () => this.onOpen()	)

		this.server.on('connection', ws => this.onConnection(ws) )
	}

	shutdown(){
		this.server.close(() => this.onShutdown())
	}

	onOpen(){}
	onConnection(ws){}
	onShutdown(){}
}

class Session{
	constructor(ws){
		this.ws = ws
		this.ws.on('message', msg => this.onMessage(this.decode(msg)))
		this.ws.on('close', () => this.onClose() )

	}

	onMessage(msg){}
	onClose(){}

	send(msg){
		this.ws.send(this.encode(msg))
	}
}

class JSONSession extends Session{
	constructor(ws){
		super(ws)
	}

	decode(msg){
		return JSON.parse(msg)
	}

	encode(msg){
		return JSON.stringify(msg)
	}
}

module.exports = {Server, Session, JSONSession}
