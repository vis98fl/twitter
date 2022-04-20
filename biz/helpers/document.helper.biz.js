const CONSTANTS = require('../../constants/appConstants');
const S3 = require('../../proxy/s3.proxy');
const BaseException = require('../../exceptions/base.exception');
const config = require('config');

class DocumentHelperBiz {
	constructor() {
	}
	
	uploadS3(file_name,data) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!data) return resolve({});
				const s3_bucket = config.get('aws.s3');
				const s3Proxy = new S3(s3_bucket);
				const s3Object = await s3Proxy.putObject(file_name,data);
				const result = { s3_bucket:s3_bucket.bucket,s3_key:file_name };
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
	getS3(file_name) {
		return new Promise(async (resolve, reject) => {	
			try {
				const s3_bucket = config.get('aws.s3');
				const s3Proxy = new S3(s3_bucket);
				const s3Object = await s3Proxy.getObject(file_name);
				const result = { s3_object:s3Object.Body,s3_key:file_name };
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	getS3Signed(key) {
		return new Promise(async (resolve, reject) => {	
			try {
				const s3_bucket = config.get('aws.s3');
				const s3Proxy = new S3(s3_bucket);
				const url = await s3Proxy.getSignedUrl(key);
				const result = { s3_object:url };
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = DocumentHelperBiz;
