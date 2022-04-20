const EventEmitterBiz = require('./helpers/eventEmitter.biz');
class SomeBiz {
	constructor() {
		this.eventEmitter = new EventEmitterBiz();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = {};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
	update(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = {};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
	fetch(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = {};
				resolve(result);
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = SomeBiz;
