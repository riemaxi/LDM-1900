const https = require('https')
const http = require('http')
const querystring = require('querystring')

class SECHTTPOST{
	constructor(hostname, path, key, json, handle){
		let data = querystring.stringify(json)
		let details = {
			hostname: hostname,
			method: 'POST',
			path: path,
			auth: key,

			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(data)
			}
		}

		let request = https.request(details, res => {
			var data = ''
			res.on('data', d => data += d)
			res.on('end', () =>  handle({res : data, status : res.statusCode}))
		})

		request.on('error', error => handle({res: error, status : 0}))

		request.write(data)
		request.end()

	}
}


class HTTPOST{
	constructor(hostname, path, json, handle){
		let data = querystring.stringify(json)
		let details = {
			hostname: hostname,
			method: 'POST',
			path: path

			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length' : Buffer.byteLength(data)
			}
		}

		let request = http.request(details, res => {
			var data = ''
			res.on('data', d => data += d)
			res.on('end', () =>  handle({res : data, status : res.statusCode}))
		})

		request.on('error', error => handle({res: error, status : 0}))

		request.write(data)
		request.end()

	}
}
