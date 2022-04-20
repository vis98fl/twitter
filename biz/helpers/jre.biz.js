const Engine = require('json-rules-engine').Engine;
const JreBadRuleException = require('../../exceptions/jre-bad-rule.exception');

class Jre {
    constructor(){
    }
    start(rules, fact) {
		return new Promise(async (resolve, reject) => {	
			try {
                // this.engine.addOperator('between', (factValue, jsonValue) => {
                //     if (!factValue) return false
                //     jsonValue = jsonValue.split('-');
                //     var leastValue = Number(jsonValue[0]);
                //     var maxValue = Number(jsonValue[1]);
                //     return factValue >= leastValue && factValue <= maxValue;
                // })
    
                for (var rule of rules) {
                    let engine = new Engine();
                    engine.addRule(rule);
                    let facts = fact;
                    // engine.on('success', (event, almanac, ruleResult) => resolve(ruleResult));
                    // engine.on('failure', async (event, almanac, ruleResult) => resolve(ruleResult));
                    const results = await engine.run(facts);
                    if (!results.events.length) {
                        return resolve(rule.event.params.message);
                    }
                }
                resolve(false);
			} catch (error) {
				reject(error);
			}
		});
    }
    
    run(rules, fact) {
		return new Promise(async (resolve, reject) => {	
			try {
                let result = await this.start(rules,fact);
                if(result){
                    let msg = result;
                    throw new JreBadRuleException(msg);
                }
                resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}

}

module.exports = Jre;