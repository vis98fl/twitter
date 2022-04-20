const BaseException = require('./base.exception');

class FuzzyException extends BaseException {
	constructor(error,code) {
		super(`Bad Fuzzy Request: ${JSON.stringify(error)}`, 'ERROR', code);
	}
}

module.exports = FuzzyException;