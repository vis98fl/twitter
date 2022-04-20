const  { CONSOLE_LOG } = require('../constants/boilerplate.config'); 

const BaseValidator = require('./base.validator');

const SchemaValidator = require('jsonschema').Validator;

class HeaderValidator extends BaseValidator {
	constructor(schema){
		super();
		this.schema = schema;
	}
	create(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, this.schema));
			CONSOLE_LOG && console.log(schemaValidator.validate(data, this.schema));
		} catch (error) {
			CONSOLE_LOG && console.log(error);
			throw error;
		}
	}
}

module.exports = HeaderValidator;
