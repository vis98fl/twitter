const { SEARCH_LIST  } = require('../constants/appConstants');
const keysInObject = require('keys-in-object');
const RequestResponseLogger = require('../models/mongo/request-response.logger');
const ServiceCallLogger = require('../models/mongo/service-call.logger');
class MongoLogger {

    async log_service_call(data){
        return new Promise(async (resolve, reject) => {
            try{
                ServiceCallLogger.save(data);
                resolve(true);
            }
            catch(err){
                reject(err);
            }
        });
    }

    async log_request_response(data){
        return new Promise(async (resolve, reject) => {
            try{
                RequestResponseLogger.save(data);
                resolve(true);
            }
            catch(err){
                reject(err);
            }
        });
    }
    search_key(data){
        let identifier = null;
        try{
            let SEARCH = SEARCH_LIST;
            for(let id in SEARCH){
                let found = keysInObject(data, SEARCH[id]);
                identifier = found && (found[0]) ? found[0] : null;
                if(identifier) break;
            }
        }catch(err){
            identifier = null;
        }
        return identifier;
    }
}

module.exports = MongoLogger;