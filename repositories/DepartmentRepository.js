const { Op } = require('sequelize');
const initDepartmentModel = require('../models/Department');
const sequelize = require('../config/db.config.js');

const Department = initDepartmentModel(sequelize);

class DepartmentRepository {
  async create(departmentData, company_id) {
      const newDepartment = await Department.create({
        name: departmentData.name,
        created_by: departmentData.created_by,
        company_id,
      });
      return newDepartment;
  }
      
  async getById(departmentId, companyId) {
    const department = await Department.findOne({
      where: {id: departmentId, company_id: companyId}, 
      returning: true,
    });
    return department;

  }

  async update(departmentId, companyId, departmentData){
    const [updatedRowCount, updatedDepartments] = await Department.update(departmentData, {
      where: {id: departmentId, company_id: companyId},
      returning: true,
    });
    if(updatedRowCount === 0){
      return null;
    }
    return updatedDepartments[0];
  }

  async delete(departmentId, companyId){;
    const result = await Department.destroy({
      where: {id: departmentId, company_id: companyId},
    });
    return result;
  }

  
}


module.exports = new DepartmentRepository();