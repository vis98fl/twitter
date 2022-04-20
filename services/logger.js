const { APPLICATION_NAME , CONSOLE_LOG  } = require('../constants/boilerplate.config');
const httpContext = require('express-http-context');
const MongoLogger = require('./mongo.logger');
class Logger extends MongoLogger {
    constructor(){
        super();
    }
    async error(data,statusCode=500, methodName=""){
        return new Promise(async (resolve, reject) => {
            try{
                let uuid = httpContext.get('uuid');
                let event = httpContext.get('event');
                let syslogs = httpContext.get('syslogs');
                switch (statusCode){
                    case 200:
                        data.LEVEL = 'INFO';
                        break;
                    case 400:
                        data.LEVEL = 'WARNING';
                        break;
                    default:
                        data.LEVEL = 'ERROR';   
                }
                const log_data = {
                    uuid : uuid,
                    event : event,
                    level: data.LEVEL,
                    statusCode: data.code || statusCode,
                    applicationName: APPLICATION_NAME,
                    methodName : methodName,
                    data : data
                };
                //const flKafkalogger = logger.logFlData(statusCode, APP_NAME, methodName, data);
                // logger.error(log_data);
                //searching a key for identifier list in constant
                let identifier = super.search_key(data);
                const log_data_mongo = {
                    uuid : uuid,
                    event : event,
                    identifier : identifier,
                    headers: data.headers,
                    request: data.request_data,
                    response: data.errorObj,
                    syslogs : syslogs,
                    action: "ERROR",
                }
                log_data['identifier'] = identifier;
                logger.error(log_data); //winston logging
                await super.log_request_response(log_data_mongo);
                resolve(true);
            }
            catch(err){
                reject(err);
            }
        });
    }
    async request(data){
        return new Promise(async (resolve, reject) => {
            try{
                //searching a key for identifier list in constant
                let identifier = super.search_key(data);
                
                //write a request response logger
                let uuid = httpContext.get('uuid');
                let event = httpContext.get('event');
                let syslogs = httpContext.get('syslogs');

                //logging
                const log_data = {
                    uuid : uuid,
                    event : event,
                    identifier : identifier,
                    headers: data.headers,
                    request: data.request,
                    response: data.response,
                    syslogs : syslogs,
                    action: data.action
                }
                await super.log_request_response(log_data);
                resolve(true);
            }
            catch(err){
                reject(err);
            }
        });
    }
    async service_calls(data){
        return new Promise(async (resolve, reject) => {
            try{
                //searching a key for identifier list in constant
                let identifier = super.search_key(data);
                let uuid = httpContext.get('uuid');
                let event = httpContext.get('event');
                var log_data = {uuid,event,identifier};

                //logging
                for(var key in data){
                    log_data[key] = data[key];
                }
                await super.log_service_call(log_data);
                resolve(true);
            }
            catch(err){
                reject(err);
            }
        });
    }
}

module.exports = Logger;