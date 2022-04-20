const config = require('config');
const AWS = require('aws-sdk');

class SecretsManagerProxy {
	/**
     * This is the default constructor of this class.
     */
	constructor(conf=config.get(`aws.secrets`)) {
		AWS.config.update(conf);
		this.secrets = new AWS.SecretsManager();
	}
	/**
	 * Dumps the message on topic channel
	 * @param {string} message
	 */

	getSecretValue(key) {
		return new Promise(async (resolve, reject) => {	
			try {
				let params = {
					SecretId: key /* required */
				};
				const result = await this.secrets.getSecretValue(params).promise();
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SecretsManagerProxy;
