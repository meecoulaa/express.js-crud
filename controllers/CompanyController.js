const { validationResult } = require('express-validator');
const CompanyService = require('../service/CompanyService');

class CompanyController {
    async create (req,res){
        try{
            const company = await CompanyService.create(req.body);
            res.status(201).json(company);
        }
        catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async show (req,res){
        try{
            const company = await CompanyService.getById(req.params.company_id);

            if(!company){
                return res.status(404).json({ error: 'Company not found' });
            }
            res.status(200).json(company);
        }
        catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async paginated (req, res){
        try{
            const { search, sortField, sortOrder, page, limit, filterBy } = req.query;
            
            const companyList = await CompanyService.paginated({ search, sortField, sortOrder, page, limit, filterBy });
            
            res.status(200).json(companyList);
        }
        
        catch(error){
            res.status(500).json({ error: 'Internal Server Error'});
        }
    }

    async update (req, res){
        try{
            const updatedCompany = await CompanyService.update(req.params.company_id, req.body);

            if(!updatedCompany){
                return res.status(404).json({ error: 'Company not found'});
            }

            res.status(200).json(updatedCompany);
        }
        catch(error){
            res.status(500).json({ error: 'Internal Server Error'});
        }
    }

    async delete(req, res) {
        try {
            const deletedCompany = await CompanyService.delete(req.params.company_id);

            if (!deletedCompany) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'Company deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

module.exports = new CompanyController();