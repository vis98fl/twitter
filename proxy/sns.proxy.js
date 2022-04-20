const config = require('config');
const AWS = require('aws-sdk');

class SnsProxy {
	/**
     * This is the default constructor of this class.
     */
	constructor(conf=config.get(`aws.sns`)) {
		AWS.config.update(conf);
		this.sns = new AWS.SNS();
		this.topicArn = conf.TopicArn;
	}
	/**
	 * Dumps the message on topic channel
	 * @param {string} message
	 */

	publish(message) {
		return new Promise(async (resolve, reject) => {	
			try {
				const params = {
					Message: JSON.stringify({ ...message }),
					// MessageStructure: 'json',
					TopicArn: this.topicArn
				};
				const result = await this.sns.publish(params).promise();
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SnsProxy;
