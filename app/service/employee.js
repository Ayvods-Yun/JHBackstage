'use strict';

const Service = require('egg').Service;

class EmployeeService extends Service {
    async createEmployee(params) {
        try {
            const result = await this.app.mysql.insert('employee_list', {
                id: this.ctx.helper.uuid(23),
                job_number: params.jobNumber,
                password: params.password,
                name: params.name,
                gender: params.gender,
                age: params.age,
                education: params.education,
                contract_date: params.contractDate,
                employee_type: params.employeeType,
                auth_id: params.authId,
                station_id: params.stationId
            });
            return result;
        } catch (error) {
            console.log(error, '>>>>>>>>>>>>')
            return 'error';
        }
    }
}

module.exports = EmployeeService;