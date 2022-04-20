const crypto = require('crypto');
const fs = require('fs');
const BaseException = require('../../exceptions/base.exception');

module.exports = {
	getFileMimeType: (data) => ((fileType(data) && fileType(data).mime) ? fileType(data).mime : ''),
	getFileHash: (data) => {
		try {
			const shasum = crypto
				.createHash('sha1')
				.update(data);
			return shasum.digest('hex');
		} catch (error) {
			return '';
		}
	},
	getFileExtension: (name) => {
		try {
			const parts = name.split('.');
			if (parts.length > 0) {
				return `.${parts[parts.length - 1]}`;
			}
			return '';
		} catch (error) {
			return '';
		}
	},
	isMimeTypeValid: (type) => {
		if (!type) {
			return false;
		}
		return (type.indexOf('image') > -1 || type.indexOf('pdf') > -1 || type.indexOf('form') > -1);
	},
	getFileSize: (path, unit) => {
		try {
			const stats = fs.statSync(path);
			const sizeinBytes = stats.size;
			let size = sizeinBytes;
			switch (unit.toLowerCase()) {
			case 'mb':
				size = sizeinBytes / 1000000;
				break;
			case 'kb':
				size = sizeinBytes / 1000;
				break;
			default:
				break;
			}
			return size;
		} catch (error) {
			return null;
		}
	}
};
