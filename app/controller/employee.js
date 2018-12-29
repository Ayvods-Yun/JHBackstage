'use strict';

const Controller = require('egg').Controller;

class EmployeeController extends Controller {
    async createEmployee() {
        const result = await this.ctx.service.employee.createEmployee(this.ctx.request.body);
        this.ctx.body = result;
	}
}

module.exports = EmployeeController;