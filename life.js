
class Individual extends require('./controlsystem').TIModel{
	constructor(DEV, P, E, G, B, C, D, bases){
		super(DEV, P, E, G, B, C, D)

		this.bases = bases || 10
	}

	mutation(){
		let idx = Math.random()*this.G.length
		return this.G.map((base, i) => i==idx?(base + 1)%this.bases:base)
	}

	clone(){
		return new Individual(
			this.DEV,
			this.P,
			this.E,
			this.mutation(), //mutation of G
			this.B,
			this.C,
			this.D
			)
	}

	split(limit){
		let list = []
		while(limit--)
			list.push( this.clone() )
		return list
	}
}

class Process{
	constructor(){
		this.individuals = []
	}

	createIndividual(){
		return new Individual()
	}

	splitIndividual(individual, number){
		return []
	}

	population(size){
		while(size--)
			this.individuals.push( this.createIndividual() )
		return this
	}

	migration(){
		return this
	}

	reproduction(){
		let size = this.individuals.length
		while(size){
			this.individuals.concat(this.splitIndividual(this.individuals[size-1],2))
			size--
		}
		return this
	}

	radiation(size){
		return	this.population(size)
			.migration()
			.reproduction()
	}

	extintion(){
		return this
	}
}

module.exports = {Process,Individual}
