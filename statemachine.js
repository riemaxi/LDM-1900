
class State{
	constructor(id){
		this.id = id
	}

	leave(){ console.log(this.id, 'leave') }
	enter(){ console.log(this.id, 'enter')}
	operate(event){ console.log(this.id,event, 'enter')}
}

class StateMachine{
	constructor(){
		this.onTransition = (ls,ns,le) => {}
		this.initialize()
	}

	reactOn(event){
		this.currentState = this.nextState(this.currentState, event.id)
		if (!this.sameState()){
			this.transition()
			this.currentState.enter()
		}

		this.currentState.operate(event)
	}

	transition(){
		this.lastState.leave()
		this.onTransition(lastState, currentState, lastEvent)
		this.lastState = this.currentState

	}

	nextState(state, eventId){ return state }
	sameState(){ return this.lastState.id == this.currentState.id }
	initialize(){
		this.currentState = new State(0)
		this.lastState = this.currentState
	}
}

module.exports = {StateMachine, State}


