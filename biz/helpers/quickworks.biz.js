const API_SUIT = require('../../constants/api-suit.json');
const HttpProxy = require('../../proxy/http-proxy');

class QuickworksBiz {
	constructor() {
	}

	publish(data) {
		return new Promise(async (resolve, reject) => {	
			try {
                const QUICKWORKS = API_SUIT.QUICKWORKS_WORKFLOW;
				const quickworksProxy = new HttpProxy(QUICKWORKS,{...data},null);
				const result = await quickworksProxy.make_request(null, false);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = QuickworksBiz;
