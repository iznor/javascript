/***********************************Ido Dor****************************************/
const http = require("http");
const logger = require("./logger");
const trip = require("./trip.js");
const myEvents = require("./myEvents.js");
const port = 8080;
http.createServer(async (req, res) => {
	res.writeHead(200);
	let data = '';
	req.on('data', chunk => {
		data += chunk;
	})
	const errEvent =(param)=>{myEvents.emit('errLogEvent', param);}
	let adr = new URL(`http://localhost:${port}${req.url}`);
	const { protocol, host, search } = adr;
	const queryPath = adr.pathname.valueOf();
	const method = req.method;
	let splitPath = queryPath.split('/');
	const responseModel = async () => {
		if (!splitPath[1] || splitPath.length > 3) {
			errEvent('InvalidPath');
			return;
		}
		switch (splitPath[1]) {
			case 'members':
				if (method == 'GET' && splitPath[2]) {
					if (!trip.getMember(splitPath[2])) {
						return;
					} else {
						logger.log('info', `Success: ${method}`);
						return trip.getMember(splitPath[2]);
					}
				} else {
					errEvent('InvalidPath');
					return;
				}
			case 'dates':
				if (method == 'GET' && splitPath[2]) {
					if (!trip.getDate(splitPath[2])) {
						return;
					} else {
						logger.log('info', `Success: ${method}`);
						return trip.getDate(splitPath[2]);
					}
				} else {
					errEvent('InvalidPath');
					return;
				}
			case 'choices':
				if (method == 'POST' && !splitPath[2]) {
					return new Promise((resolve, reject) => {
						req.on('end', () => {
							let parsedObject = JSON.parse(data);
							let choice = parsedObject;
							if (trip.choices.find(x => x.memberId == choice.memberId)) {
								errEvent('alreadyExists');
								resolve('Fail!');
							} else if (!trip.getMember(choice.memberId)) {
								errEvent('memberNotFound');
								resolve('Fail!')
							} else if (!trip.getDate(choice.dateId)) {
								errEvent('dateNotFound');
								resolve('Fail!')
							} else {
								trip.choices.push(choice);
								logger.log('info', `Success: ${method}`);
								resolve("Success!");
							}
						})
					})

				} else if (method == 'PUT') {
					return new Promise((resolve, reject) => {
						req.on('end', () => {
							if (splitPath.length < 3) {
								errEvent('InvalidPath');
								resolve('Fail!');
							}
							let parsedObject = JSON.parse(data);
							let newDate = parsedObject.dateId;
							let index = trip.choices.findIndex(x => x.memberId == splitPath[2]);
							if (!trip.getDate(newDate)) {
								resolve('Fail!');
							}else if (index === -1) {
								errEvent('memberDidNotChoose');
								resolve('Fail!');
							} else {
								trip.choices[index].dateId = newDate;
								logger.log('info', `Success: ${method}`);
								resolve("Success!");
							}
						})
					})
				} else if (method == 'GET') {
					if (splitPath.length > 2 && !splitPath[2]) {
						errEvent('InvalidPath');
						return;
					}
					if (!trip.choices.length) {
						errEvent('emptyList');
						return;
					}
					let summary = [...trip.choices].map((value, index) => {
						const date = trip.getDate(value.dateId).date;
						const member = trip.getMember(value.memberId);
						logger.log('info', `Success: ${method}`);
						return { ...member, date }
					})
					if (!splitPath[2]) {
						logger.log('info', `Success: ${method}`);
						return summary;
					}
					//if id was specified - return specific choice of a member
					logger.log('info', `Success: ${method}`);
					return summary.find(x => x.id == splitPath[2]).date;
				} else if (method == 'DELETE') {
					return new Promise((resolve, reject) => {
						req.on('end', () => {
							if (splitPath.length < 3 || !splitPath[2]) {
								errEvent('InvalidPath');
								resolve('Fail!');
							}
							let index = trip.choices.findIndex(x => x.memberId == splitPath[2]);
							if (index === -1) {
								errEvent('memberDidNotChoose');
								resolve('Fail!')
							} else {
								trip.choices.splice(index);
								logger.log('info', `Success: ${method}`);
								resolve("Success!");
							}
						})
					})
				}
				return;
			default:
				errEvent('InvalidPath');
				return;
		}
	}
	
	let stringResponse = JSON.stringify(await responseModel());
	if (stringResponse) {
		logger.log('info', `Response: ${stringResponse}`);
		res.write(stringResponse);
	} else {
		errEvent('emptyResponse');
	}
	res.end();
}).listen(port, logger.log('info', `Listening on port ${port}`));