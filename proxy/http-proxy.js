const rp = require('request-promise');
const Proxy = require('./proxy');
const Constants = require('../constants/appConstants');
const BaseException = require('../exceptions/base.exception');

class HttpProxy extends Proxy {
    constructor(API, request_data = null, query_param = null) {
        super(API);
        this.data = request_data;
        this.query_param = query_param;
    }
    prepare_options() {
        for (let key in this.query_param) {
            let val = encodeURIComponent(this.query_param[key]);
            this.endpoint = this.endpoint.replace(`{${key}}`, val);
            this.endpoint = this.endpoint.replace(/['"]+/g, '');
        }
        var optionsData = {
            encoding: this.encoding,
            headers: this.headers,
            uri: this.endpoint,
            method: this.method,
            rejectUnauthorized: false,
            json: this.content_json
        };
        if (['POST', 'PUT', 'PATCH','DELETE'].includes(this.method)) {
            optionsData.body = (this.data) ? this.data : {};
            if (this.content_type == Constants.FORM_DATA) {
                optionsData.formData = (this.data) ? this.data : {};
                optionsData.headers = { ...this.headers, "content-Type": "multipart/form-data" };
                delete optionsData.body;
                delete optionsData.json;
                delete optionsData.rejectUnauthorized;
                delete optionsData.encoding;
            }
            
            if (this.content_type == Constants.X_WWW_FORM_URLENCODED) {
                optionsData.form = this.data;
                optionsData.headers = this.headers;
                delete optionsData.body;
                delete optionsData.headers.authorization;
                delete optionsData.json;
                delete optionsData.rejectUnauthorized;
                delete optionsData.encoding;
            }
        }
        return optionsData;
    }

    set_headers(headers = null) {
        if(!headers){
            return false
        }
        for (let key in headers) {
            this.headers[`${key}`] = headers[key];
        }
        return true
    }

    make_request(headers = null) {
        return new Promise(async (resolve, reject) => {
            try {
                //call pre preflight request 
                await super.pre_flight();
                headers && this.set_headers(headers);
                //transform contract payload
                this.data = await super.transform();
                var options = this.prepare_options();
                this.response_body = await rp(options);
                if (!this.response_body) {
                    throw new BaseException(`Request responded with no reponse body ${options}`); //no response error
                }
                if(typeof this.response_body == "string")
                    this.response_body = JSON.parse(this.response_body);
                resolve(this.response_body);
            }
            catch (err) {
                this.error = err;
                reject(err);
            }
            finally{
               super.log(options);
            }
        });
    }
    //Uncomment if you want to request for a file from source
    // make_file_request() {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             var options = this.prepare_options();
    //             options.resolveWithFullResponse = true
    //             this.response_body = await rp(options);
    //             if (!this.response_body) {
    //                 throw new Error(); //no response error
    //             }
    //             const bufferBase64 = new Buffer.from(this.response_body.body, 'binary');
    //             const headers = this.response_body.headers;
    //             this.response_body = "Binary data send";
    //             resolve({data:bufferBase64,headers});
    //         }
    //         catch (err) {
    //             this.error = err;
    //             reject(err);
    //         }
    //         finally{
    //             super.log(options);
    //         }
    //     });
    // }
}

module.exports = HttpProxy;