const config = require('./config.json')
const GUI = require('./gui')

class Channel extends require('./channel'){
	constructor(config){
		super(config)
	}

	onOpen(){
		super.onOpen()
		new GUI( config )
	}
}

new Channel(config)

