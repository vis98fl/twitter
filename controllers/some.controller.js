const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { someSchema } = require('../schema/schema-suit');
const SomeBiz = require('../biz/some.biz');

class SomeController {
	register(app) {
		/**
		 * @api {post} v1/some/ Create some
		 * @apiVersion 1.0.0
		 * @apiName CreateSome
		 * @apiGroup Some
		 * @apiPermission admin
		 *
		 * @apiDescription This endpoint will create a some!
		 *
		 * @apiHeader {String} client_code will be shared to you .
		 * @apiHeaderExample {Header} Header-Example
		 *     "client_code: client_code"
		 *
		 * @apiExample {bash} Curl example
		 * curl -X POST -H "client_code: client_code" -i https://console.flexiloans.com/v1/some
		 *
		 * @apiSuccess {String} result <code>created</code> if everything went fine.
		 * @apiSuccessExample {json} Success-Example
		 *     HTTP/1.1 201 CREATED
		 *      {
		 *			"success": true,
		 *			"event": "SOME_CREATED",
		 *			"message": "created some successfully.",
		 *			"uuid": "e043e090-758f-11eb-833e-1b36d8ab14c1",
		 *			"data": {}
		 *		}
		 *
		 * @apiError NoAccessRight Only authenticated Admins can access the data.
		 * @apiError UserNotFound   The <code>id</code> of the User was not found.
		 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
		 *
		 * @apiErrorExample Response (example):
		 *     HTTP/1.1 401 Not Authenticated
		 *     {
		 *       "error": "NoAccessRight"
		 *     }
		 */
		app.route('/v1/some')
		.post(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				const validator = new RequestValidator(someSchema);
				validator.create({...request.params,...request.body});

				const someBiz = new SomeBiz();
				const _result = await someBiz.create({...request.params,...request.body});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `created some successfully.`, {
					services: [
						CONSTANTS.LOGGING,
						CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_CREATED,
							headers : { ...request.headers},
							request: {...request.params,...request.body},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
		.get(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;

				const validator = new RequestValidator(someSchema);
				validator.create({...request.params,...request.query});

				const someBiz = new SomeBiz();
				const _result = await someBiz.fetch({...request.params,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `fetched some successfully.`, {
					services: [
						CONSTANTS.LOGGING,
						CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_FETCHED,
							request: {...request.params,...request.query,client_code},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
		.put(async (request, response, next) => {
			try {
				const {
					client_code
				} = request.header;
				
				const validator = new RequestValidator(someSchema);
				validator.create({...request.params,...request.body,...request.query});

				const someBiz = new SomeBiz();
				const _result = await someBiz.update({...request.params,...request.body,...request.query});
				
				const responseDecorator = new ResponseDecorator({...request.params,...request.body,...request.query});
				const result = responseDecorator.decorate(_result);
				
				response.json({
					result,
				}, `updated some successfully.`, {
					services: [
						CONSTANTS.LOGGING,
						CONSTANTS.EVENT_EMIT
					],
					data: { 
							action : CONSTANTS.ACTION.SOME_UPDATED,
							request: {...request.params,...request.body,...request.query,client_code},
							response: result
				}
				});
			} catch (error) {
				next(error);
			}
		})
	}
}

module.exports = SomeController;
