//your app constants come here
const config = require('config');
module.exports = {
	CLIENT_CODES : config.get('app_config.client_code'),
	APPLICATION_JSON: 'application/json',
	JSON : 'json',
	TEXT_XML : 'text/xml',
	FORM_DATA: 'multipart/form-data',
	X_WWW_FORM_URLENCODED : 'application/x-www-form-urlencoded',
	LOGGING: 'LOGGING',
	EVENT_EMIT: 'EVENT_EMIT',
	DOC_DIRECTORY: 'storage/tmp',
	DOC_ZIP_DIRECTORY: 'storage/tmp/zip',
	DOCUMENT_TYPE : '',
	DOCUMENT_CATEGORY : '',
	DOCUMENT_SOURCE : 'LOS',
	REQUEST_ID_PREFIX : 'SERVICENAME',
	ENTITY_TYPE : ['T','RP','RC'],
	DOCUMENT_SECTION : '',
	CURRENT_TIMESTAMP : 'CURRENT_TIMESTAMP',
	SHEET_NAME : 'SHEET_NAME',
	DEFAULT_DATE_FORMAT : 'YYYY-MM-DD HH:mm:ss',
	CSV : 'CSV',
	EXCEL : 'XLSL',
	CSV_EXTENSION : '.csv',
	EXCEL_EXTENSION : '.xlsx',
	EMIT_QUICKWORKS_EVENTS : [],
	EMIT_EVENTBRIDGE_EVENTS : [],
	HEADER_VALIDATOR_EXCEPTOR : ['CHECK_APPLICATION_HEALTH','API_DOCUMENTATION','TWITTER_HOME_PAGE','TWITTER_REG','TWITTER_USERS','DELETE_USER','UPDATE_USER','CREATE_TWEET','GET_TWEET','DEL_TWEET','CREATE_LIKES','GET_LIKE','CREATE_FOLLOWS','GET_FOLLOWERS'],
	ACTION: {
		TWITTER_HOME_PAGE : 'TWITTER_HOME_PAGE',
		SOME_CREATED : 'SOME_CREATED',
		SOME_UPDATED: 'SOME_UPDATED',
		SOME_FETCHED : 'SOME_UPDATED'

	},
	SEARCH_LIST : ["loan_code", "loanCode", "code"],
	EVENT : {
		'/' : {
			GET : 'API_DOCUMENTATION'
		},
		'/init' : {
			GET : 'CHECK_APPLICATION_HEALTH'
		},
		'/twitter/home' : {
			GET : 'TWITTER_HOME_PAGE'
		},
		'/twitter/register':{
			POST:'TWITTER_REG'
		},
		'/twitter/Users':{
			GET:'TWITTER_USERS'
		},
		'/twitter/users/deleteUser/:userid':{
			DELETE:'DELETE_USER'
		},
		'/twitter/users/updateUser/:userid':{
			PUT:'UPDATE_USER'
		},
		'/twitter/tweet/:userid':{
			GET:'GET_TWEET'
		},
		'/twitter/tweets/:userid':{
			POST:'CREATE_TWEET'  
		},
		'/twitter/tweets/:userid/:tweetid':{
			DELETE:'DEL_TWEET'
		},
		'/twitter/likes/:tweetid':{
			GET:'GET_LIKE'
		},
		'/twitter/likes/:userid/:tweetid':{
			POST:'CREATE_LIKES'
		},
		'/twitter/follows/:followerid/:followeeid':{
			POST:'CREATE_FOLLOWS'
		},
		'/twitter/:followeeid/followers':{
			GET:'GET_FOLLOWERS'
		},
		'/v1/some' : {
			POST : 'SOME_CREATED',
			PUT : 'SOME_UPDATED',
			GET : 'SOME_UPDATED'
		}
	}
};