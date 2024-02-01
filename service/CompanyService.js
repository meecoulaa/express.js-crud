const CompanyRepository = require('../repositories/CompanyRepository.js');
const bcrypt = require('bcrypt');

class CompanyService {
    async create(companyData){
        const company = await CompanyRepository.create(companyData);
        return company;
    }

    async getById(companyId){
        const company = await CompanyRepository.getById(companyId);
        return company;
    }

    async paginated({ search, sortField, sortOrder, page, limit, filterBy }){
        const companyList = await CompanyRepository.paginated({ search, sortField, sortOrder, page, limit, filterBy });

        return companyList;
    }

    async update(companyId, companyData){
        const updatedCompany = await CompanyRepository.update(companyId, companyData);
        return updatedCompany;
    }

    async delete(companyId){
        const existingCompany = await CompanyRepository.getById(companyId);
        return await CompanyRepository.delete(companyId);
    }

    
    
}

module.exports = new CompanyService();