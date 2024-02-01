const { Op } = require('sequelize');
const initCompanyModel = require('../models/Company');
const sequelize = require('../config/db.config.js');

const Company = initCompanyModel(sequelize);

class CompanyRepository {
  async create(companyData) {
    const newCompany = await Company.create(companyData);
    return newCompany;
  }

  async getById(companyId){
    const user = await Company.findByPk(companyId);
    return user;
  }

  async paginated({ search, sortField, sortOrder, page, limit, filterBy }){
    limit = limit ? limit : 10;
    const offset = page&&limit? (page - 1) * limit : 1;
    sortOrder = sortOrder ? sortOrder : 'desc';
    sortField = sortField ? sortField : 'created_at';
    const whereClause = search ? {[Op.or]: 
        [
            { handle: { [Op.iLike]: `%${search}%` } },
            { name: { [Op.iLike]: `%${search}%` } },
            { website: { [Op.iLike]: `%${search}%` } },
            { representative_first_name: { [Op.iLike]: `%${search}%` } },
            { representative_last_name  : { [Op.iLike]: `%${search}%` } },
        ],
    }: {};

    const conditions = {
      where: whereClause ? whereClause : "",
      order: [[sortField, sortOrder === 'desc' ? 'DESC' : 'ASC']],
      offset: offset,
      limit: limit,
    };

    // Retrieve paginated list of companies from the database
    const companyList = await Company.findAll(conditions);
    return companyList;
  }

  async update (companyId, companyData){
    const [updatedRowCount, updatedCompanies] = await Company.update(companyData, {
        where: {id: companyId},
        returning: true,
    });
    if(updatedRowCount === 0){
        return null;
    }
    return updatedCompanies[0];
  }

  async delete(companyId){
    const result = await Company.destroy({
        where: {id: companyId},
    });
    return result;
  }

  
}


module.exports = new CompanyRepository();