const serviceConstants = require('../constants/appConstants');
const Logger = require('../services/logger');
const logger = new Logger();
const EventEmitter = require('../biz/helpers/eventEmitter.biz');

const fs = require('fs');
const path = require('path');

class ServiceHandler {
	execute(data) {
		if (data && data.services) {
			data.services.forEach(service => {
				switch (service) {
					case serviceConstants.LOGGING:
						// Call and async fucntions without await to avoid blocking of API response and execute services
						const log = data && data.data;
						const result = {
							action: log.action,
							headers: log.headers,
							request: log.request,
							response: log.response
						}
						logger.request(result);
						break;
					case serviceConstants.EVENT_EMIT:
						// Call and async fucntions without await to avoid blocking of API response and execute services
						const event = data && data.data;
						const payload = {
							...event.request,
							...event.response
						}
						const eventEmitter = new EventEmitter();
						eventEmitter.emit(payload);
						break;

					case serviceConstants.UNLINK_DOC:
						// const DIRECTORY = data && data.data.directory;

						// // Unlink files from given directory (async task)
						// fs.readdir(DIRECTORY, (err, files) => {
						// 	if (err) throw err;
						// 	for (const file of files) {
						// 		fs.unlink(path.join(DIRECTORY, file), err => {
						// 			if (err) throw err;
						// 		});
						// 	}
						// });
						break;

					case serviceConstants.SHARE_DOCUMENT_COLENDER:
						// const fileInfo = data && data.response;
						break;

					default:
						break;
				}
			});
		}
	}
}

module.exports = ServiceHandler;