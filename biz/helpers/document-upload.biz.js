const _ = require('lodash');
const moment = require('moment');
const HttpProxy = require('../../proxy/http-proxy');
const API = require('../../constants/api-suit.json');
const SqlBiz = require('./sql.biz');
const QUERY = require('../../constants/queryRepo');
const TransformerBiz = require('./transformer.biz');
const TEMPLATE = require('../../constants/template');
const QueryBuilderBiz = require('./query-builder.biz');
const InvalidParamException = require('../../exceptions/invalid-param.exception');
const MissingParamException = require('../../exceptions/missing-param.exception');
const DocumentHelperBiz = require('./document.helper.biz');
const DocumentUtil = require('./document.util');
const Helpers = require('../../utils/helper.utility');
const RequestValidator = require('../../validators/request.validator');
const CONSTANTS = require('../../constants/appConstants');
const { 
	uploadDocument,
 } = require('../../schema/schema-suit');


class DocumentUploadBiz {
	constructor() {
		this.sql = new SqlBiz();
		this.transformer = new TransformerBiz();
	}

	upload(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				const validator = new RequestValidator(uploadDocument);
				validator.create({...data});

				const file = _.get(data,'file',null);
				if(!file)
					throw new MissingParamException('file');
				
				//const contentType = data.headers['content-type'];
				// if (contentType.indexOf('multipart/form-data') > -1) {
				// 	const fileMimeType = file.mimetype;
				// 	if (!DocumentUtil.isMimeTypeValid(fileMimeType)) {
				// 		throw new InvalidParamException(file.name);
				// 	}
				// }

				let entity_id = _.get(data,'entity_id',null);
				entity_id = parseInt(entity_id);
				if(!Number.isInteger(entity_id))
					throw new InvalidParamException('entity_id');


				const uploaded_by = _.get(data,'user_id',null);
				const hash = DocumentUtil.getFileHash(file.data);
				const file_type = DocumentUtil.getFileExtension(file.name);
				const file_name = file.name;
				const file_description = _.get(data,'file_description',null);
				const entity_type = _.get(data,'entity_type',null);
				const upload_datetime = Helpers.now();


				//upload to s3
				const s3_file_name = `${entity_type}${entity_id}/${Helpers.uniqid()}${file_type}`;
				const documentHelperBiz = new DocumentHelperBiz();
				const s3 = await documentHelperBiz.uploadS3(s3_file_name,file.data); 
				const s3_bucket = _.get(s3,'s3_bucket',null);
				const s3_key = _.get(s3,'s3_key',null);

				const queryBuilderBiz = new QueryBuilderBiz("cm_documents");
				const query = await queryBuilderBiz.insert({file_name,file_description,entity_type,entity_id,file_type,uploaded_by,s3_bucket,s3_key,hash,upload_datetime});
				const result = await this.sql.insert(query,{});

				const response = await this.transformer.transform({entity_type,entity_id,...result},TEMPLATE.DOCUMENT.UPLOAD_RESPONSE);
				resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = DocumentUploadBiz;
