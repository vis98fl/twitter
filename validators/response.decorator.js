class ResponseDecorator{
    constructor(request){
        this.request = request;
    }
	decorate(data) {
		try {
			// const result = {
            //     "key" : this.value,
            //     "key" : value
            // };
            const result = data;
            return result;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = ResponseDecorator;