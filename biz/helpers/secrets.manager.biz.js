const SecretsManagerProxy = require('../../proxy/secrets.manager.proxy');
const config = require('config');
const _ = require('lodash');
class SecretsManagerBiz {
	constructor() {
		this.keys = {
			"db.mysql" : "keyname"
		};
	}

	getSecretValue(key) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!key) return resolve({});
				//you can configure all your wrappers here	
				const secretsManagerBiz = new SecretsManagerProxy();
				const secrets = await secretsManagerBiz.getSecretValue(key);
				const result = secrets && secrets.SecretString;
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	fetch() {
		return new Promise(async (resolve, reject) => {	
			try {
				let result = [];
				if(!this.keys){
					return resolve({message : 'No keys to get'});
				}
				for(let conf in this.keys){
					const key = this.keys[conf];
					let secrets = await this.getSecretValue(key);
					result.push(secrets);
					secrets = secrets && JSON.parse(secrets);
					secrets = secrets[key] && JSON.parse(secrets[key]);
					_.set(config,`${conf}`,secrets);
				}
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SecretsManagerBiz;
