const _ = require('lodash');
const moment = require('moment');
const dateTime = require('date-and-time');
const dateFormat = require('dateformat');
const CONSTANTS = require('../constants/appConstants');
module.exports = {
    dateFormatter: (datapoint,datapoint_format,format) => {
        if(!datapoint) return null;
        if(datapoint==CONSTANTS.CURRENT_TIMESTAMP){
            datapoint = new Date();
        }
        datapoint_format = datapoint_format || CONSTANTS.DEFAULT_DATE_FORMAT;
        datapoint = (typeof datapoint=='object') ? datapoint : dateTime.parse(datapoint,datapoint_format.toUpperCase());
        return dateFormat(datapoint,format.toLowerCase());

    },
    timeStamp(){
        return moment().unix();
    },
    now(){
        return moment(new Date()).format('YYYY-MM-DD H:mm:ss');
    },
    timeStampToDateTime(timestamp){
        try{
            return new Date(parseInt(timestamp)).toISOString();
        }catch(err){
            return moment(new Date()).format('YYYY-MM-DD H:mm:ss');
        }
    },
    map(arr,key){
        try{
            return _.map(arr, key);
        }catch(err){
            return null
        }
    },
    length(arr1){
        try{//used for eligibility
            return arr1.length;
        }catch(err){
            return 1
        }
    },
    intersection(arr1,arr2){
        try{
            return _.intersection(arr1, arr2);
        }catch(err){
            return [true]
        }
    },
    difference(arr1,arr2){
        try{
            return _.difference(arr1,arr2);
        }catch(err){
            return [true];
        }
    },
    dateToNumberFormatter : (format,datapoint,datapoint_format)=>{
        if(!datapoint) return null;
        datapoint_format = datapoint_format || CONSTANTS.DEFAULT_DATE_FORMAT;
        datapoint = dateTime.parse(datapoint,datapoint_format);
        format = format || "years";
        let now = new Date();
        let a = moment(now);
        let b = moment(datapoint);
        let diff = a.diff(b, format);
        return diff || 0;
    },
    timestamp : ()=> { 
        return new Date().getTime();
    },
    splitName: (fullName)=>{
        let firstName = '';
        let middleName = '';
        let lastName = '';
        if(!fullName){
            return ({firstName,middleName,lastName});
        }
        fullName=fullName.trim();
        firstName = fullName.split(' ').slice(0,1).join(' ');
        middleName = fullName.split(' ').slice(1, -1).join(' ');
        lastName = fullName.split(' ').slice(-1).join(' ');
        lastName = (firstName==lastName) ? "" : lastName;
        return ({firstName,middleName,lastName});
    },
    _splitName: (fullName,root)=>{
        let firstName = '';
        let middleName = '';
        let lastName = '';
        if(!fullName){
            return ({firstName,middleName,lastName});
        }
        fullName = _.get(root,fullName);
        if(!fullName){
            return ({firstName,middleName,lastName});
        }
        fullName=fullName.trim();
        firstName = fullName.split(' ').slice(0,1).join(' ');
        middleName = fullName.split(' ').slice(1, -1).join(' ');
        lastName = fullName.split(' ').slice(-1).join(' ');
        lastName = (firstName==lastName) ? "" : lastName;
        return ({firstName,middleName,lastName});
    },
    split:(str)=>{
        try{
            return str.split(',');
        }catch(err){
            return [];
        }
    },
    json_parse:(data)=>{
        return JSON.parse(data);
    },
    json_stringify:(data)=>{
        if(!data){
            return null;
        }
        return JSON.stringify(data);
    },
    to_string:(data)=>{
        if(!data){
            return null;
        }
        return data.toString();
    },
    clean:(root,data)=>{
        try{
            return _.get(root,data,null);
        }catch(err){
            return null;
        }
        
    },
    split_address(...param){
        try{
            let str = param[0] || param[1];
            let pos = param[2];
            let len = str.length;
            let splice = Math.ceil(len/3);
            let arr = str.match(new RegExp(`.{1,${splice}}`,'g'));
            return arr[pos];
        }catch(err){
            return null;
        }
    },
    substring:(str,start,end)=>{
        try{
            return str.substring(start,end);
        }catch(err){
            return null
        }

    },
    clip:(data,precesion)=>{
        try{
            let num = parseFloat(data).toFixed(precesion);
            return (num!='NaN') ? parseFloat(num) : null;
        }catch(err){
            return null;
        }
    },
    string_func:(str,func)=>{
        try{
            return str[func]();
        }catch(err){
            return null;
        }
    },
    string_concat:(...str)=>
    { 
        try{
            var str1 = str.filter(function(el){ return !['',' ','null',null,undefined].includes(el)}); 
            return str1.join(' ');
        }catch(err){
            return str.join(' ');
        }
        
    },
    _ : _,
    // unzipFolder: (source, target) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const fileContents = fs.createReadStream(`${source}`);
    //             fileContents.pipe(unzipper.Extract({ path: target }))
    //                 .on('close', (err) => {
    //                     resolve(target);
    //                 })
    //                 .on('error', (err) => {
    //                     reject(err);
    //                 });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // },
    uniqid: (prefix, length) => {
        if (prefix === undefined) {
            prefix = 'D';
        }
        if (length === undefined) {
            length = 15;
        }
        const ts = Math.round((new Date()).getTime() / 1000);
        // the below line generates 11 chars random string.
        let code = ts.toString(16).substring(0, 8);

        if (length <= code.length) {
            return code.substring(code.length - length);
        }

        const extraLength = length - code.length;
        // generating random two chars.
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < extraLength; i++) { code += possible.charAt(Math.floor(Math.random() * possible.length)); }

        return `${prefix}${code}`;
    }

}