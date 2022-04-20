const winston = require('winston');

module.exports = () => {
    var logger = new (winston.createLogger)({
        transports: [
            new (winston.transports.File)({
                name: 'error-file',
                filename: 'storage/logs/Error.log'
            })
        ]
      });
    return logger;
}
