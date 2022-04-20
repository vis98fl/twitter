const SnsProxy = require('../../proxy/sns.proxy');
const httpContext = require('express-http-context');

class SnsBiz {
	constructor() {
	}

	publish(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!data) return resolve({});
				//you can configure all your wrappers here
				let message = {};
				let uuid = httpContext.get('uuid');
				let event = httpContext.get('event');
				if (!data || (data.code && data.code.indexOf('ERROR') > -1)) {
					message = {
						success: false,
						uuid : uuid,
						message : event || '',
						error: data
					};
				} else {
					message = {
						success: true,
						message: event || '',
						uuid : uuid,
						data : data || ''
					};
				}
				const snsProxy = new SnsProxy();
				const result = await snsProxy.publish(message);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SnsBiz;
