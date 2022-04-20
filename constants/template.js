//your app templates come here
const CONSTANT = require('../constants/appConstants');
module.exports = {
    client_code : {
        some : {
            request : `{
                "loan_code" : "{{#? clean($root,'loan_code')}}",
                "policy" : "{{#? clean($root,'policy')}}",
                "is_active" : "1"
            }`
        }
    },
    DOCUMENT : {
        UPLOAD_RESPONSE : `{
          "document_id": "{{#? clean($root,'insertId')}}",
          "entity_type": "{{#? clean($root,'entity_type')}}",
          "entity_id": "{{#? clean($root,'entity_id')}}"
        }`
    },
}

