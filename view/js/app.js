//Definitions

function string(json){
	return JSON.stringify(json)
}


class Model{
	constructor(config){
		this.onData = (message) => {}
		this.onItem = (message) => {}

		this.ws = new WebSocket(config.channel)
		this.ws.onopen = ()=> { this.ws.send( string(config.access ) ) }
		this.ws.onmessage = (msg) => {
			console.log(msg)
		}
	}


	fetchData(id){
		this.ws.send( string({command: "fetch", type: id}) )
	}

}

class View{
	constructor(){
		/*this.get('btnkeys').onclick = (event) => {
			this.onClick('keys')
		}*/

	}

	update(id, data){
	}

	get(id){
		return document.getElementById(id)
	}
}

class Controller{
	constructor(model, view){
		view.onTab = (id) => { model.fetchData(id) }
		model.onData = (message) => { view.update( message.id, mesage.data ) }
	}
}

//Initialization
new Controller(
	new Model(_MODEL_CONFIG_),
	new View()
)
