const EventBridgeBiz = require('./event-bridge.biz');
const QuickworksBiz = require('./quickworks.biz');
const httpContext = require('express-http-context');
const keysInObject = require('keys-in-object');
const { EMIT_QUICKWORKS_EVENTS,EMIT_EVENTBRIDGE_EVENTS, SEARCH_LIST } = require('../../constants/appConstants');
const _ = require('lodash');

class EventEmitterBiz {
	constructor() {
		this.quickworks = new QuickworksBiz();
		this.eventBridge = new EventBridgeBiz();
	}

	emit(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				const result = {};
                let uuid = httpContext.get('uuid');
				let event = httpContext.get('event');
				let loan_code = await this.search_key(data) || httpContext.get('loan_code');
	
				const payload = {
					success : true,
					event,
					uuid,
					loan_code,
					data
				};
				
				// Only listed events will be emitted
				if(EMIT_QUICKWORKS_EVENTS.includes(event)) await this.quickworks.publish(payload);
				if(EMIT_EVENTBRIDGE_EVENTS.includes(event)) await this.eventBridge.putEvents(data);
				resolve(result);
			} catch (error) {
				reject(error);
			}
		});
	}

	search_key(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				let identifier = null;
				let SEARCH = SEARCH_LIST;
				for(let id in SEARCH){
					let found = keysInObject(data, SEARCH[id]);
					identifier = found && (found[0]) ? found[0] : null;
					if(identifier) break;
				}
				return resolve(identifier);
			} catch (error) {
				return resolve(null);
			}
		});
	}
}

module.exports = EventEmitterBiz;
