const config = require('config');
const AWS = require('aws-sdk');
const httpContext = require('express-http-context');
const { APPLICATION_NAME } = require('../constants/boilerplate.config');

class EventBridgeProxy {
	/**
     * This is the default constructor of this class.
     */
	constructor(conf=config.get(`aws.eventbridge`)) {
		AWS.config.update(conf);
		this.event = httpContext.get('event');
		this.eventBridge = new AWS.EventBridge();
		this.eventBusName = conf.EventBusName;
		this.source = APPLICATION_NAME;
	}
	/**
	 * Dumps the message on topic channel
	 * @param {string} message
	 */

	putEvents(message) {
		return new Promise(async (resolve, reject) => {	
			try {
				const params = {
					Entries: [ /* required */
					  {
						Detail: JSON.stringify({ ...message }),
						DetailType: this.event,
						EventBusName: this.eventBusName,
						Resources : [
							'epimoney'
						],
						Source: this.source,
						Time: new Date()
					  },
					  /* more items */
					]
				};
				const result = await this.eventBridge.putEvents(params).promise();
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = EventBridgeProxy;
