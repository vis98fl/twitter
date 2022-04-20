const CONSTANTS = require('../constants/appConstants');
const STRING = 'string';
const INT = 'int';
const DOUBLE = 'double';
const OBJECT = 'object';
const ARRAY = 'array';

const AnyOfStringNull = [
	{ type: STRING },
	{ type: null },
];

const AnyOfDoubleNull = [
	{ type: DOUBLE },
	{ type: null },
];

const AnyOfIntNull = [
	{ type: INT },
	{ type: null },
];

const AnyOfArrayNull = [
	{ type: ARRAY },
	{ type: null },
];
module.exports = {
	someSchema: {
		id: '/someSchema',
		type: 'object',
		required: [],
		properties: {
		},
	},
	fuzzySchema: {
		id: '/fuzzySchema',
		type: 'object',
		required: ['full_name','match_name'],
		properties: {
			full_name : { type : 'string' },
			match_name : { type : 'string' }
		},
	},
	header: {
		id: '/header',
		type: 'object',
		required: ['client_code'],
		properties: {
			client_code : { type : 'string', enum: CONSTANTS.CLIENT_CODES },
		},
	},
	uploadDocument: {
		id: '/uploadDocument',
		type: 'object',
		required: ['entity_type','entity_id','file'],
		properties: {
			entity_type : { type : 'string', minLength: 1, enum:CONSTANTS.ENTITY_TYPE},
			entity_id : { type : 'string', minLength: 1},
			file : { type : 'object' },
			file_description : { type : 'string' }
		}
	},
};
