const DepartmentService = require('../service/DepartmentService');
const CompanyService = require('../service/CompanyService');
const UserService = require('../service/UserService');

class DepartmentController {
    async create(req, res) {
        try {
            if(!(await UserService.getById(req.body.created_by)))
                return res.status(404).json({ error: 'User not found '});

            const department = await DepartmentService.create(req.body, req.params.company_id);

            res.status(201).json(department);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async show(req, res) {
        try {
            const department = await DepartmentService.getById(req.params.department_id, req.params.company_id);

            if(!department){
                return res.status(404).json({ error: 'Department not found' });
            }
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res){
        try {
            const updatedDepartment = await DepartmentService.update(req.params.department_id,req.params.company_id, req.body);
            if (!updatedDepartment) {
                return res.status(404).json({ error: 'Department not found' });
            }
            res.status(200).json(updatedDepartment);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res){
        try{
            const deletedDepartment = await DepartmentService.delete(req.params.department_id,req.params.company_id);
            if(!deletedDepartment){
                return res.status(404).json({ error: 'Department not found'})
            }

            res.status(200).json({ message: 'Department deleted successfully'});
        }
        catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new DepartmentController();