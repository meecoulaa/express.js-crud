const { body,param, validationResult } = require("express-validator");

class DepartmentValidation {
    create(req,res,next) {     
        const validationRules = [
            param("company_id").isUUID().withMessage("Invalid company ID"),
            body('name').notEmpty().withMessage('Name is required'),
            body('created_by').notEmpty().isUUID.apply('Invalid user ID'),
            body('parent_id').optional().isUUID.apply('Invalid parent ID'),
        ];
        
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    show(req,res,next){
        const validationRules = [
            param("company_id").isUUID().withMessage("Invalid company ID"),
            param("department_id").isUUID().withMessage("Invalid company department ID"),
        ];
        
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    update(req,res,next){
        
        const validationRules = [
            param("company_id").isUUID().withMessage("Invalid company ID"),
            param("department_id").isUUID().withMessage("Invalid company department ID"),
            body("name").optional().notEmpty().withMessage("Name cannot be empty"),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    delete(req,res,next){
        const validationRules = [
            param("company_id").isUUID().withMessage("Invalid company ID"),
            param("department_id").isUUID().withMessage("Invalid company department ID"),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }
};

module.exports = new DepartmentValidation();