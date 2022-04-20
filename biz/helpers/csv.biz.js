const { Parser } = require('json2csv');
const fs = require('fs');
const { DOC_DIRECTORY, CSV_EXTENSION } = require('../../constants/appConstants');

class CsvBiz {
	constructor() {
	}

	create(rows) {
		return new Promise(async (resolve, reject) => {
			try {
				if(!rows[0]) return resolve(null);
				const fields = Object.keys(rows[0]);
				const opts = { fields };	
				const parser = new Parser(opts);
				const csv = parser.parse(rows);
				const name = `${new Date().getTime()}${CSV_EXTENSION}`;
				const path = `${DOC_DIRECTORY}/${name}`;
				fs.writeFileSync(path,csv);  
				resolve({name,path});
			} catch(error){
				return reject(error);
			}
		});
	}
	buffer(rows) {
		return new Promise(async (resolve, reject) => {
			try {
				if(!rows[0]) return resolve(null);
				const file = await this.create(rows);
				if(!file) return resolve(null);
				const buffer = fs.createReadStream(file.path);
				fs.unlink(file.path,(err)=>{});
				resolve({name:file.name,buffer})
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = CsvBiz;
