const EventBusProxy = require('../../proxy/event-bridge.proxy');
const httpContext = require('express-http-context');

class EventBridgeBiz {
	constructor() {
	}

	putEvents(data) {
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
						event : event || '',
						error: data
					};
				} else {
					message = {
						success: true,
						event: event || '',
						uuid : uuid,
						data : data || ''
					};
				}
				const eventBusProxy = new EventBusProxy();
				const result = await eventBusProxy.putEvents(message);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = EventBridgeBiz;
