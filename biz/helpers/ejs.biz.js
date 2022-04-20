const ejs = require('ejs');

class EjsBiz {
	constructor() {
	}

	bind(html_content, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				const content_to_bind = html_content.replace(/&lt;%(\s+)?\$([a-zA-Z_]+)(\s+)?%&gt;/g, '<%=$2%>').replace(/<%(\s+)?\$([a-zA-Z_]+)(\s+)?%>/g, '<%=$2%>');
				const template = ejs.render(content_to_bind, payload);
				resolve(template)
			} catch(error){
				return reject(error);
			}
		});
	}
}


module.exports = EjsBiz;
