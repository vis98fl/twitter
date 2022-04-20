const Constants = require('../constants/appConstants');

module.exports = {
    client_code : {
        some : {
            id: '/some',
            type: 'object',
            required: ['loan_code'],
            properties: {
                loan_code : { type : 'string'}
            },
            message: "loan_code - Required"
        }
    } 
};