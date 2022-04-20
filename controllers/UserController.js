//const CONSTANTS = require('../constants/appConstants');


//const { validateRegister } = require('../utils/validates')
const urlSchemaValidator  = require('../utils/validates');


const userRepo = require('../repositories/UserRepo')
const UserRepo = new userRepo();

class UserController {



	register(app) {
		//register user
		app.route('/register')
			.post(async (request, response, next) => {
				try {
					//let { errors } = validateRegister(request.body);
					/*if (errors.length > 0) {
						response.json({ errors }, 'error', '');
						return;
					}*/
					const validator=new urlSchemaValidator();
					validator.validateRegister(request.body)
					

					let result = await UserRepo.registerUser(request.body);
					response.json({ result }, '', '')
				} catch (error) {
					next(error);
				}
			});

		app.route('/home')
			.get(async (request, response, next) => {
				response.send("homepage of twitter")
			});

	    //list users
		app.route('/users')
			.get(async (request, response, next) => {
				try {
					const result = await UserRepo.getUsers()
					response.json({ result }, '', '')
				}
				catch (error) {
					next(error);
				}
			});

			//delete user
		app.route('/users/deleteUser/:userid')
			.delete(async (request, response, next) => {
				try {
					const userid = request.params.userid;
					const result = await UserRepo.deleteUser(userid)
					response.json({ result }, '', '')
				}
				catch (error) {
					next(error);
				}
			});

			//update user
		app.route('/users/updateUser/:userid')
			.put(async (request, response, next) => {
				try {
					const userid = request.params.userid;
					const result = await UserRepo.updateUser(userid,request.body)
					response.json({ result }, 'successfully updated', '')
				}
				catch (error) {
					next(error);
				}
			});

			//following someone
		app.route('/follows/:followerid/:followeeid')
			.post(async (request, response, next) => {
				try {
					const data = {...request.params};
					const result = await UserRepo.followUser(data);
					response.json({ result }, '', '')
				}
				catch (error) {
					next(error);
				}
			});

			app.route('/:followeeid/followers')
			.get(async (request, response, next) => {
				try {
					const data = {...request.params};
					const result = await UserRepo.getFollowers(data);
					response.json({ result }, '', '')
				}
				catch (error) {
					next(error);
				}
			});
	}
}

module.exports = UserController;
