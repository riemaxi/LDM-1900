const http = require('http');
const url = require('url');
const Decoder = require('string_decoder').StringDecoder;

const UTF_8 = 'utf-8';

class HTTPServer{
	constructor(port, start){
		this.decoder = new Decoder(UTF_8);

		this.port = port;
		this.server = http.createServer((req, res)=>{
			this.handle(req, res);
		});

		if (start)
			this.start();
	}

	start(){
		this.server.listen(this.port, () => this.onListening());
	}

	onGet(req, res){
		this.fetchPayload(req, (data) => this.onGetPayload(req, res, data));
	}

	onPost(req, res){
		this.fetchPayload(req, (data) => this.onPostPayload(req, res, data));
	}

	onPut(req, res){
		this.fetchPayload(req, (data) => this.onPutPayload(req, res, data));
	}

	onDelete(req, res){
		this.fetchPayload(req, (data) => this.onDeletePayload(req, res, data));
	}

	onGetPayload(req, res, data){
	}

	onPutPayload(req, res, data){
	}

	onPostPayload(req, res, data){
	}

	onDeletePayload(req, res, data){
	}

	onListening(){
		console.log('listening on port ', this.port);
	}

	handle(req, res){
		switch(this.method(req)){
			case 'get' : this.onGet(req, res); break;
			case 'post': this.onPost(req, res); break;
			case 'put': this. onPut(req, res); break;
			case 'delete': this.onDelete(req, res); break;
		}

	}

	fetchPayload(req, handle){
		var payload = '';
		req.on('data', (data)=> payload += this.decoder.write(data) );
		req.on('end', () => {
			payload += this.decoder.end();
			handle(payload);
	});
	}

	method(req){
		return req.method.toLowerCase();
	}

	parsedUrl(req){
		return url.parse(req.url, true)
	}

	path(req){
		var p = this.parsedUrl(req).pathname;
		return p.replace(/^\/+|\/+$/g,'');
	}
}


module.exports = HTTPServer;
