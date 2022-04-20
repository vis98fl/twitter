const clc = require("cli-color");
const _ = require('lodash');
const httpContext = require('express-http-context');
const {  CONSOLE_LOG } = require('../constants/boilerplate.config');
const mapping = {
    log: clc.blue,
    warn: clc.yellow,
    error: clc.red,
    info : clc.blue
};

module.exports = () => {
    var logger = ["log", "warn", "error","info"].forEach(function(method) {
        var oldMethod = console[method].bind(console);
        console[method] = function() {
            let oldLog = httpContext.get('syslogs');
            (oldLog) ? oldLog.push(_.get(arguments,'[0]')) : oldLog = [_.get(arguments,'[0]')];
            httpContext.set('syslogs',oldLog);
            
            CONSOLE_LOG && oldMethod.apply(
                console,
                [mapping[method](new Date().toISOString())]
                    .concat(arguments)
            );
        };
    });
    return logger;
}
