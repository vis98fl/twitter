const config = require('config');
const AWS = require('aws-sdk');

class SqsProxy {
	/**
     * This is the default constructor of this class.
     */
	constructor(conf=config.get(`aws.sqs`)) {
		AWS.config.update(conf);
		this.sqs = new AWS.SQS();
		this.topicUrl = conf.TopicUrl;
	}
	/**
	 * Dumps the message on topic channel
	 * @param {string} message
	 */

	sendMessage(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				let params = {
					MessageBody: JSON.stringify(data), /* required */
					QueueUrl: this.topicUrl, /* required */
				};
				const result = await this.sqs.sendMessage(params).promise();
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteMessage(receiptHandle) {
		return new Promise(async (resolve, reject) => {	
			try {
				let params = {
					QueueUrl: this.topicUrl, /* required */
					ReceiptHandle: receiptHandle /* required */
				};
				const result = await this.sqs.deleteMessage(params).promise();
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SqsProxy;
