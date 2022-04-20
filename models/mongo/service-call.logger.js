const MongoException = require('../../exceptions/mongo.expection'),
      mongoose = require('mongoose');
const { SERVICE_CALL_LOGGER } = require('../../constants/boilerplate.config');
      
const ServiceCallLogger = new mongoose.Schema({
            uuid : {
                type : String,
                required : true
            },
            event : {
                type: String
            },
            identifier : {
                type: String
            },
            action : {
                type: String
            },
            API : {
                type : String,
                default : null
            },
            service : {
                type : String,
                default : null
            },
            query_param : {
                type : JSON,
                default : null
            },
            request :  {
                 type : JSON,
                 default : null
            },
            response : {
                type : JSON,
                default: null
            },
            raw_request : {
                type : JSON,
                default: null
            }
},
{ timestamps: { createdAt: 'created_at', updatedAt : 'updated_at'} }
);
var Model = mongoose.model(`${SERVICE_CALL_LOGGER}`,ServiceCallLogger);

async function _save(params){
        return new Promise(async (resolve, reject) => {
            try {   
                if(!params){
                    throw new MongoException(`no paramaters passed to save in ${SERVICE_CALL_LOGGER} model`);
                }
                    Model.create(params, function(err,record){
                        if(err) {
                            return reject(err);
                        }
                        resolve(record);
                    });
                }
                catch(error){
                    reject(error);
                }
        });
    }
    //uncomment if you want to find and update a document
    // async function _find_and_update(params){
    //     return new Promise(async (resolve, reject) => {
    //         try {   
    //             if(!params){
    //                 throw new MongoException(`no paramaters passed to save in ${SERVICE_CALL_LOGGER} model`);
    //             }
    //                 Model.findOneAndUpdate({uuid: params.uuid}, params, {upsert: true, useFindAndModify: false, new: true}, function(err,record){
    //                     if(err) {
    //                         return reject(err);
    //                     }
    //                     resolve(record);
    //                 });
    //             }
    //             catch(error){
    //                 reject(error);
    //             }
    //     });
    // }

module.exports = {
    save : _save,
    // find_and_update : _find_and_update,
    ServiceCallLogger : ServiceCallLogger
}