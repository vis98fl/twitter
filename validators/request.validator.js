const httpContext = require('express-http-context');

const  { CONSOLE_LOG } = require('../constants/boilerplate.config'); 

const BaseValidator = require('./base.validator');

const SchemaValidator = require('jsonschema').Validator;

class RequestValidator extends BaseValidator {
	constructor(schema){
		super();
		this.schema = schema;
	}
	create(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, this.schema));
			CONSOLE_LOG && console.log(schemaValidator.validate(data, this.schema));

			//GET SCHEMA DATA
			let SCHEMA_DATA = httpContext.get('SCHEMA_DATA') || {};
			Object.assign( SCHEMA_DATA , { ...data });
			//SCHEMA DATA STORE IN SESSION
			httpContext.set('SCHEMA_DATA', SCHEMA_DATA);
		} catch (error) {
			throw error;
		}
	}
}

module.exports = RequestValidator;
