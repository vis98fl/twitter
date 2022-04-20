const httpContext = require('express-http-context');
const ServiceHandler = require('../services/handler');
const { HEADER_RESPONSE_KEY } = require("../constants/boilerplate.config");

module.exports = async (request, response, next) => {
	try {
		const oldJson = response.json;

		response.json = (data, message, services = null) => {
			let uuid = httpContext.get('uuid');
			let event = httpContext.get('event');
			let newResponseData = {};
			if (!data || (data.code && data.code.indexOf('ERROR') > -1)) {
				newResponseData = {
					success: false,
					uuid : uuid,
					event : event,
					error: data
				};
			} else {
				newResponseData = {
					success: true,
					event : event,
					message: message || '',
					uuid : uuid,
					data : data.result || ''
				};
			}

			response.json = oldJson;

			// services - to be used for async calls
			const serviceHandler = new ServiceHandler();
			serviceHandler.execute(services);

			//set response headers
			response.header(HEADER_RESPONSE_KEY, uuid);

			return oldJson.call(response, newResponseData);
		};
		next();
	} catch (error) {
		next(error);
	}
};
