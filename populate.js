class Individual extends require('./life').Individual{
	constructor(DEV, P, E, G, B, C, D, bases){
		super(	[.1,.1,.1,.1],
			[1,1,1,1],
			[.4,.7,.5,.4],
			[3,6,6,7],
			[1,1,1,1],
			[1,1,1,1],
			[1],
			10)

		console.log('new super human - bases', this.bases)

	}

}

class Process extends require('./life').Process{
	constructor(){
		super()
	}

	createIndividual(){
		return new Individual()
	}

	splitIndividual(ind, number){
		let list = []
		while(number){
			list.push(new Individual(
			ind.DEV,
			ind.P,
			ind.E,
			ind.mutation(), //mutation of G
			ind.B,
			ind.C,
			ind.D
			))
			number--
		}
		return list
	}
}



new  Process().radiation(100).extintion()
