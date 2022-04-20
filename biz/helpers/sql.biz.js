const CONSTANTS = require('../../constants/appConstants');
const QueryRepo = require('../../repositories/query.repository');

class SqlBiz {
	constructor() {
        this.queryRepo = new QueryRepo();
	}
	get(data,queries) {
		return new Promise(async (resolve, reject) => {	
			try {
            var result = {};
            for(var query of queries){
                let raw = await this.queryRepo.get_sql_data(query,data);
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

    select(data,queries) {
		return new Promise(async (resolve, reject) => {	
			try {
          var result = [];
          for(var query of queries){
              let raw = await this.queryRepo.get_all_data(query,data);
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

    get_one(data,query) {
		return new Promise(async (resolve, reject) => {	
			try {
          let raw = await this.queryRepo.get_all_data(query,data);
          let result = raw
          resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    insert(query,data){
        return new Promise(async (resolve, reject) => {	
			try {
        let result = await this.queryRepo.create(query,data);
        resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }

    update(query,data){
        return new Promise(async (resolve, reject) => {	
			try {
        let result = await this.queryRepo.create(query,data);
        resolve(result);
			} catch (error) {
				reject(error);
			}
		});
    }
}

module.exports = SqlBiz;
