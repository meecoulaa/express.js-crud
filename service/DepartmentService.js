const DepartmentRepository = require('../repositories/DepartmentRepository.js');
const bcrypt = require('bcrypt');

class DepartmentService {
    async create(departmentData, company_id){
        const department = await DepartmentRepository.create(departmentData, company_id);
        return department;
    }

    async getById(departmentId, companyId){
        const department = await DepartmentRepository.getById(departmentId, companyId);
        return department;
    }

    async update(departmentId, companyId, departmentData){
        const updatedDepartment = await DepartmentRepository.update(departmentId,companyId, departmentData);
        return updatedDepartment;
    }

    async delete(departmentId, companyId){
        const existingDepartment = await DepartmentRepository.getById(departmentId, companyId);
        return await DepartmentRepository.delete(departmentId,companyId);
    }
    
    
}

module.exports = new DepartmentService();