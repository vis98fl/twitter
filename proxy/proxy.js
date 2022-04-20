const Config = require('config');
const _ = require('lodash');
const {APPLICATION_JSON} = require('../constants/appConstants');
const Logger = require('../services/logger');
const TransformerBiz = require('../biz/helpers/transformer.biz');
const logger = new Logger();
class Proxy{
    constructor(API){
        this.transformer = new TransformerBiz();
        this.action_name = API.name;
        this.service_name = API.service
        this.config =  Config.get(this.service_name);
        this.contract = _.get(API,'contract',null);
        this.pre_flight = _.get(API,'pre_flight',null);
        this.header_contract = _.get(API,'header_contract',null);
        this.url = this.config.url;
        this.endpoint = this.url + API.endpoint;
        this.method = API.method;
        this.encoding = this.config.encoding || null;
        this.content_json = (this.config.content_type==APPLICATION_JSON) ? true : false;
        this.content_type = this.config.content_type;
        this.headers = Object.assign({},this.config.headers);
        this.headers['content-Type'] = this.config.content_type;
        this.headers['authorization'] = this.config.authorization;
    }
    async log(options){
        return new Promise(async (resolve, reject) => {
            try{
                let err = this.error &&  {code:this.error.code,message:this.error.message,error:this.error.error};
                const data = {
                    query_param : this.query_param || null,
                    request: this.data || null,
                    response: this.response_body || err,
                    action : this.action_name,
                    API : this.endpoint,
                    service : this.service_name,
                    raw_request : options
                }
                logger.service_calls(data);
            }
            catch(err){
                reject(err);
            }
        });
    }

    transform() {
		return new Promise(async (resolve, reject) => {
			try {
                if(!this.contract){
                    return resolve(this.data);
                }
                this.contract = (this.contract) ? this.contract : {};
                this.data = (this.data) ? this.data : {};
                this.contract = (typeof this.contract==='object') ? JSON.stringify(this.contract) : this.contract;
                this.data = (typeof this.data==='object') ? JSON.stringify(this.data) : this.data;
                const payload = await this.transformer.transform(this.data,this.contract);
                this.data = payload;
				resolve(payload);
			} catch(error){
				reject(error);
			}
		});
    }
    
    pre_flight() {
		return new Promise(async (resolve, reject) => {
			try {
                let headers = {};
                if(!this.pre_flight){
                    return resolve(headers);
                }
                let requests = []; 
                for(let endpoint of this.pre_flight){
                    const httpProxy = new this.__proto__.constructor(endpoint,this.data,this.data);
                    requests.push(
                        httpProxy.make_request()
                    )
                }
                if(!requests.length){
                    return resolve(headers);
                }
                const result = await Promise.all(requests);
                headers = Object.assign({},...result);
                this.header_contract = (typeof this.header_contract==='object') ? JSON.stringify(this.header_contract) : this.header_contract;
                headers = await this.transformer.transform(headers,this.header_contract);
                this.set_headers(headers);
				resolve(headers);
			} catch(error){
				reject(error);
			}
		});
	}
}

module.exports = Proxy;