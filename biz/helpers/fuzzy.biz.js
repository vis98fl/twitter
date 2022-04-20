const CONSTANTS = require('../../constants/appConstants');
const API_SUIT = require('../../constants/api-suit.json');
const RequestValidator = require('../../validators/request.validator');
const HttpProxy = require('../../proxy/http-proxy');
const FuzzyException = require('../../exceptions/fuzzy.exception');
const { fuzzySchema } = require('../../schema/schema-suit');

class FuzzyBiz {
	constructor() {
	}

	create(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				const validator = new RequestValidator(fuzzySchema);
				validator.create({ ...data });
				const FUZZY = API_SUIT.FUZZY;
				const fuzzyProxy = new HttpProxy(FUZZY,null,data);
				const result = await fuzzyProxy.make_request();
				if(!result.success){
					throw new FuzzyException(result,400);
				}
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = FuzzyBiz;
