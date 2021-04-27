const fs = require('fs')

class GUI extends require('./desk'){
	constructor(config){
		super(config)
	}

	onListening(){
		this.initialize()
		console.log( this.config.greeting.replace('_PORT_', this.config.port).replace('_DATE_', new Date()))
	}

	template(){
		let c = fs.readFileSync(this.config.view.template, 'utf-8')
		c = c.replace('_TITLE_', this.config.view.title)
			.replace('_DESCRIPTION_', this.config.view.description)
			.replace('_BASEURL_', this.config.host + ':' + this.config.port)
			.replace('_LANGUAGE_', this.config.view.language)

		return c
	}

	favicon(){
		let c = fs.readFileSync(this.config.view.favicon)
		return c
	}

	style(){
		let c = fs.readFileSync(this.config.view.style, 'utf-8')
		return c

	}

	app(){
		let c = fs.readFileSync(this.config.view.app.path, 'utf-8')
		c = c.replace('_MODEL_CONFIG_', JSON.stringify(this.config.view.app.config) )
		return c
	}

}

module.exports = GUI
