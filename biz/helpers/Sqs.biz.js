const SqsProxy = require('../../proxy/sqs.proxy');
class SqsBiz {
	constructor() {
	}

	enqueue(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!data) return resolve({});
				//you can configure all your wrappers here	
				const sqsProxy = new SqsProxy();
				const result = await sqsProxy.sendMessage(data);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SqsBiz;
