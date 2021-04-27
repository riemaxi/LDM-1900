const config = require('./config.json')
const {Session} = require('./session')

class StateMachine extends require('./statemachine').StateMachine{
	constructor(router){
		super()
		this.router = router
	}

}

class Channel extends require('./server').Server{
	constructor(config){
		super(config.comm)

		this.stateMachine = new StateMachine(this)

		this.recipient = { 'central' : this }
	}

	onOpen(){
		console.log(config.comm.greeting.replace('_PORT_', config.comm.port).replace('_DATE_', new Date() ))
	}

	onConnection(ws){
		ws.on('message', msg => {
			let command = JSON.parse(msg)
			switch(command.session){
				case "admin":  this.recipient['admin'] = new Session(ws, this, 'admin'); break;
			}
			this.stateMachine.reactOn({id: 'session', data: command.session})
		})
	}

	shutdown(){
		this.stateMachine.reactOn({id: 'command', data: command.id})
		super.shutdown()
	}

	//Router
	receive(command, from){
		if (command.id == "shutdown"){
			this.shutdown()
		}else{
			this.stateMachine.reactOn({id: command.id, data: command.data})
		}
	}

	route(message, from, to){
		this.recipient[to].receive(message, from)
	}

}

module.exports = Channel
