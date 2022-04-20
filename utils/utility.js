const SHA256 = require('sha256');
const CONSTANTS = require('../constants/appConstants');

module.exports = {

get_hash(sequenceArray){
    try {
      const hash_sequence = sequenceArray.join("|");
      const hash = SHA256(hash_sequence);
      return hash;
    } catch(err){
        return null;
    }
},

get_request_id(code){
  try {
    const time = new Date().getTime();
    const requestId = `${CONSTANTS.REQUEST_ID_PREFIX}${code}${time}`;
    return requestId;
  } catch(err){
      return null;
  }
},

}