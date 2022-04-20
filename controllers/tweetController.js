const { response } = require('express')
const db = require('../models/mysql/index')
//const { validatePost } = require('../utils/validates')
const tweetRepo = require('../repositories/tweetRepo')

const urlSchemaValidator  = require('../utils/validates');


const tweet = db.tweet
const usr = db.usr

const twtRepo = new tweetRepo();

class tweetController {


	register(app) {
		//get tweets
		app.route('/tweet/:userid').get(async (request, response) => {
			try {
				let id = request.params.userid;
				const result = await twtRepo.showTweet(id)
				response.json({ result }, '', '')
			}
			catch (error) {
				next(error);
			}
		});

        //store tweet
		app.route('/tweets/:userid').post(async (request, response) => {
			try {
				/*let { errors } = validatePost(request.body);
				if (errors.length > 0) {
					response.json({ errors }, '', '');
					return;
				}*/
				const validator=new urlSchemaValidator();
				validator.validatePost(request.body)


				//  console.log(obj);
				//let v1=100
				/*let v=await req.body.firstname;
				res.send(v);*/

				let result = await twtRepo.registerTweet(request.params.userid, request.body);
				response.json({ result }, '', '')
			} catch (error) {
				next(error);
			}
		});

		//deleting tweet
		app.route('/tweets/:userid/:tweetid').delete(async (request, response) => {
			try {
				const result = await twtRepo.deleteTweet(request.params.userid, request.params.tweetid)
				response.json({ result }, '', '')
			} catch (error) {
				next(error);
			}
		});

		//like tweet 
		app.route('/likes/:userid/:tweetid').post(async (request, response) => {
			try {
				let data={...request.params}
				let result = await twtRepo.registerLike(data.userid,data.tweetid);
				response.json({ result }, '', '')
			} catch (error) {
				next(error);
			}
		});
		//getLikes
		app.route('/likes/:tweetid').get(async (request, response) => {
			try {
				let data={...request.params}
				let result = await twtRepo.showLike(data.tweetid);
				response.json({ result }, '', '')
			} catch (error) {
				next(error);
			}
		});


	}


}
module.exports = tweetController