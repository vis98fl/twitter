const config = require('config');
const AWS = require('aws-sdk');

/**
 * This is the proxy class for retrieving the document and its metadata from S3.
 */
class S3Proxy {
	/**
     * This is the default constructor of this class.
     */
	constructor(conf=config.get('aws.s3')) {
		this.s3 = new AWS.S3(conf);
		this.bucket = conf.bucket;
		this.signedUrlExpireSeconds = 60 * 5;
	}
	/**
	 * Dumps the file object in S3 bucket
	 * @param {string} key 
	 * @param {buffer} content 
	 */
	async putObject(key, content) {
		return new Promise((resolve, reject) => {
			this.s3.putObject({
				Bucket: this.bucket,
				Key: key,
				Body: content
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

	async putBase64Object(key, content,contentType='application/pdf') {
		return new Promise((resolve, reject) => {
			this.s3.putObject({
				Bucket: this.bucket,
				Key: key,
				Body: content,
				ContentEncoding: 'base64',
				ContentType: contentType
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

	async putImageObject(key, content, type) {
		return new Promise((resolve, reject) => {
			this.s3.putObject({
				Bucket: this.bucket,
				Key: key,
				Body: content,
				ContentEncoding: 'base64',
				ContentType: `image/${type}`
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}
	 /**
    * Retrieves document from S3 for the the supplied bucket and key
    * @param {string} bucket
    * @param {string} key
    */
   async getObject(key) {
	return new Promise((resolve, reject) => {
		this.s3.getObject({
			"Bucket": this.bucket,
			"Key": key
		}, (error, data) => {
			if (error) {
				return reject(error);
			}
			return resolve(data);
		});
	});
}

/**
	 * gets the signed url for passed key
	 * @param {string} key 
	 */
	async getSignedUrl(key) {
		return new Promise((resolve, reject) => {
			this.s3.getSignedUrl('putObject',{
				Bucket: this.bucket,
				Key: key,
				Expires: this.signedUrlExpireSeconds,
				// ACL: 'bucket-owner-full-control',
				ContentType: 'application/pdf'
			}, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

}

module.exports = S3Proxy;
