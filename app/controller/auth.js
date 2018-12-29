'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
	async createEmployee(id, jobNamber, password, name, gender, age, education, contractDate, employeeType) {
		this.ctx.body = 'hi, egg';
	}
}

module.exports = AuthController;
