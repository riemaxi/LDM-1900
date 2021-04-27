
//Time-invariant model
class TIModel{
	constructor(DEV, P, E, G, B,C,D ){
		this.DEV = DEV.map(a => a)
		this.P = P.map(a => a)
		this.E = E.map(a => a)
		this.G = G.map(a => a)
		this.B = B.map(a => a)
		this.C = C.map(a => a)
		this.D = D.map(a => a)
	}

	next(t, dt){
		return null
	}

	response(x){
		return 0
	}
}

module.exports = {TIModel}
