const CONSTANTS = require('../../constants/appConstants');
const MongoQueryRepo = require('../../repositories/mongoQuery.repository');

class MongoBiz {
	constructor() {
		this.mongoQueryRepo = new MongoQueryRepo();
	}

	get(data,queries) {
		return new Promise(async (resolve, reject) => {	
			try {
                var result = {};
                for(var query of queries){
                    let raw = await this.mongoQueryRepo.get_mongo_data(data, query);
                    result = {
                        ...result,
                        ...raw
                    }
                }
                resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = MongoBiz;
