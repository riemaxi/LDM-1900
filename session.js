class JSONSession extends require('./server').JSONSession{
	constructor(ws, router, name){
		super(ws)
		this.router = router
		this.name = name
	}

	receive(message, from){
		console.log(message, ' received from ', from)
	}

	route(message, to){
		this.router.route(message, this.name, to)
	}

	onClose(){
		this.route({id:'info', data: this.name + ' session has closed'}, 'central')

	}
}


class Session extends JSONSession{
	constructor(ws, router, name){
		super(ws, router, name)

		console.log('new session')
		this.send({message: 'welcome ...'})
	}

	onMessage(msg){
		console.log(msg)
		this.send({message: 'hello  ..... from server ...' , replyTo : msg})
	}

}

module.exports = {Session}
