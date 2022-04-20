const CONSTANTS = require('../../constants/appConstants');
const S3 = require('../../proxy/s3.proxy');
const BaseException = require('../../exceptions/base.exception');
const S3Exception = require('../../exceptions/s3.exception');
const Download = require('download-file');
const moment = require('moment');
const fs = require('fs');
const config = require('config');
const API_SUIT = require('../../constants/api-suit.json');
const HttpProxy = require('../../proxy/http-proxy');
const zipFolder = require('zip-folder');
const { execSync } = require('child_process');
const rimraf = require("rimraf");

class DocumentBiz {
	constructor() {
	}
	raw(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!data) throw new BaseException('No url found');
				let extension = data.split('?')[0].split('.').pop();
				let name = `${moment().unix()}.${extension}`;
				const file = await this.download(data, {directory:`./${CONSTANTS.DOC_DIRECTORY}`,filename:name});
				let buffer = fs.createReadStream(file);
				fs.unlink(`./${CONSTANTS.DOC_DIRECTORY}/${name}`,(err)=>{});
				if(!buffer) throw new BaseException('Exception occured in fetching file');
				resolve({buffer,name});
			} catch (error) {
				reject(error);
			}
		});
	}
	rawFromBuffer(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				let name = `./${CONSTANTS.DOC_DIRECTORY}/${moment().unix()}`;
				const _ = await fs.writeFileSync(name,data);
				let buffer = fs.createReadStream(name);
				fs.unlink(name,(err)=>{});
				if(!buffer) throw new BaseException('Exception occured in fetching file');
				resolve({buffer,name});
			} catch (error) {
				reject(error);
			}
		});
	}
	buffer(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!data) throw new BaseException('No url found');
				let extension = data.split('?')[0].split('.').pop();
				let name = `${moment().unix()}.${extension}`;
				const file = await this.download(data, {directory:`./${CONSTANTS.DOC_DIRECTORY}`,filename:name});
				// let buffer = fs.createReadStream(file);
				let buffer = new Buffer.from(file, 'binary');
				fs.unlink(`./${CONSTANTS.DOC_DIRECTORY}/${name}`,(err)=>{});
				if(!buffer) throw new BaseException('Exception occured in fetching file');
				resolve({buffer,name});
			} catch (error) {
				reject(error);
			}
		});
	}

	bufferZip(data){
		return new Promise(async (resolve, reject) => {
			try {
					if(!data) throw new BaseException('No url found');
					if (!fs.existsSync('./storage/tmp/zip')) {
						fs.mkdirSync(`./storage/tmp/zip`);
					}
					for (let doc of data){
						const fileName = doc.signed_url.split('/').pop().split('#')[0].split('?')[0];
						const file = await this.download(doc.signed_url, {directory:`./${CONSTANTS.DOC_ZIP_DIRECTORY}`,filename:fileName});
					}

					const zipFilePath = await this.convertToZip(`./${CONSTANTS.DOC_ZIP_DIRECTORY}`, `./${CONSTANTS.DOC_DIRECTORY}`);
					const stream = fs.readFileSync(zipFilePath);
					const encryptedBytes = stream.toString('base64');

					if (fs.existsSync(`./${CONSTANTS.DOC_ZIP_DIRECTORY}`)) {
						execSync(`chmod -R 755 ./${CONSTANTS.DOC_ZIP_DIRECTORY}`);
						rimraf(`./${CONSTANTS.DOC_ZIP_DIRECTORY}`,() => {});
					}
					if (fs.existsSync(`./${CONSTANTS.DOC_DIRECTORY}/archive.zip`)) fs.unlink(`./${CONSTANTS.DOC_DIRECTORY}/archive.zip`,(err)=>{});
					if(!encryptedBytes) throw new BaseException('Exception occured in fetching file');
					return resolve(encryptedBytes);
			} catch(error){
					return reject(error);
			}
		});
	}

	convertToZip(folderPath, zipPath){
		return new Promise(async (resolve, reject) => {	
			try {
				zipFolder(folderPath, `${zipPath}/archive.zip`, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve(`${zipPath}/archive.zip`);
					}
				});
			} catch(err){
				reject(err);
			}
		});
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
	download(url,options) {
		return new Promise(async (resolve, reject) => {	
			try {
				Download(url, options, function(err,data){
					if (err) {
						reject(`link file not found ${err}`);
					}
					resolve(data);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	createReadStreamSync(file) {
		return new Promise(async (resolve, reject) => {	
			try {
				let rstream = fs.createReadStream(file);
				rstream.on('open', (fd) => {
					resolve(rstream);
				});
				rstream.on('error', (err) => {
					reject(error);
				});
			} catch (error) {
				reject(error);
			}
		});
	  }
	  send(code,buffer) {
		return new Promise(async (resolve, reject) => {	
			try {
				if(!code || !buffer){
					throw new BaseException('No code or file found to send document');
				}
				//#TODO lead code will change to loan code
				const payload = {
					loan_code : code,
					file : buffer,
					document_category : CONSTANTS.DOCUMENT_CATEGORY,
					document_type : CONSTANTS.DOCUMENT_TYPE,
					source : CONSTANTS.DOCUMENT_SOURCE,
					section_type : CONSTANTS.DOCUMENT_SECTION
				}
				const DOCUMENT = API_SUIT.EPI_DOCUMENT_SEND;
				const documentProxy = new HttpProxy(DOCUMENT,payload,null);
				const _result = await documentProxy.make_request();
				const result = _result;
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = DocumentBiz;
