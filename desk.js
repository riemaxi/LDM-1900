const HTTPServer = require('./lib/httpserver');
const Manager = require('./manager')

class Desk extends HTTPServer{
	constructor(config){
		super(config.port)

		this.config = config
		this.manager = new Manager(config)

		this.start()
	}

	onGet(req, res){
		let params = this.path(req).split('/')

		switch(params[0]){
			case 'api' : res.setHeader('Content-Type', 'application/json'); res.end( this.apiGetRequest(params) ); break
			case 'gui' : res.setHeader('Content-Type', 'text/html'); res.end( this.guiGetRequest(params) ); break
			case 'gui.favicon' : res.setHeader('Content-Type', 'image/png'); res.end( this.favicon() ); break
			case 'gui.style' : res.setHeader('Content-Type', 'text/css'); res.end( this.style() ); break
			case 'gui.app' : res.setHeader('Content-Type', 'text/plain'); res.end( this.app() ); break
			default : res.setHeader('Content-Type', 'text/plain'); res.end( this.defaultGetRequest(params) )
		}

	}

	onPostPayload(req, res, data){
		let params = this.path(req).split('/')

		switch(params[0]){
			case 'api' : res.setHeader('Content-Type', 'application/json'); res.end( this.apiPostRequest(params, data) ); break
			case 'gui' : res.setHeader('Content-Type', 'text/html'); res.end( this.guiPostRequest(params, data) ); break
			default : res.setHeader('Content-Type', 'text/plain'); res.end( this.defaultPostRequest(params, data) );
		}
	}

	apiGetRequest(params){
		return JSON.stringify({ data: 'gui get html content ...'})
	}

	guiGetRequest(params){
		return this.template()
	}

	defaultGetRequest(params){
		return 'default get plain text content ...'
	}


	apiPostRequest(params, data){
		return JSON.stringify({data: 'api post json content ... from manager!!!'})
	}

	guiPostRequest(params, data){
		return '<h1>gui post html content!!!</h1>'
	}

	defaultPostRequest(params, data, res){
		return 'default post plain text content!!!'
	}

	//View
	template(){ return ""}
	favicon(){ return ""}
	app(){ return ""}
	style(){ return ""}

	//Business Logic
	initialize(){
		this.manager.initialize()
	}

}

module.exports = Desk
