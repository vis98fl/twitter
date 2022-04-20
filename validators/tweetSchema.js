
module.exports = {
    id: 'tweetSchema',
    type: 'object',
    required: ['tweet'],
    properties: {
           tweet: { "type": "string",minLength:1,maxLength:500}    
     }
    }
    
    