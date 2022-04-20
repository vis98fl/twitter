const userSchema = require('../validators/userSchema')
const tweetSchema = require('../validators/tweetSchema')
const BaseValidator = require('../validators/base.validator');

const SchemaValidator = require('jsonschema').Validator;



//exports.validateRegister=(inputSchema)=>{

class urlSchemaValidator extends BaseValidator {
    validateRegister(inputSchema) {
        //const validation=schemaValidator.validate(inputSchema,userSchema);
        try {
            const schemaValidator = new SchemaValidator();
            super.prepareValidationErrorObj(schemaValidator.validate(inputSchema, userSchema));

        } catch (error) {
            throw error;

        }
    }

    validatePost(inputSchema){
        try {
            const schemaValidator = new SchemaValidator();
            super.prepareValidationErrorObj(schemaValidator.validate(inputSchema, tweetSchema));

        } catch (error) {
            throw error;

        }
    }

    //return validation;

}
/*exports.validatePost=(inputSchema)=>{
    const validation=schemaValidator.validate(inputSchema,tweetSchema);
    
    return validation;
}*/

module.exports=urlSchemaValidator