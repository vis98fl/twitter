
module.exports = {
    id: 'RegisterCheck',
    type: 'object',
    required: ['firstname','username', 'email', 'password'],
    properties: {
           email: { "type": "string","pattern":"^\\S+@\\S+\\.\\S+$"},
           password: {"type": "string" ,"minLength":6},
          username: { type: "string"},
          firstname:{type:"string"}
     }
    }
    
    