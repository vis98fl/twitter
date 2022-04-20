const jsonata = require("jsonata");
class JsonQueryBiz {
	constructor(data=null){
		this.data = data;
	}
	select(query,data=null) {
		return new Promise(async (resolve, reject) => {	
			try {
				data = data || this.data;
				const expression = jsonata(query);
				const result = expression.evaluate(data);
				resolve(result || null);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = JsonQueryBiz;
