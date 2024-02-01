const { body,param, validationResult } = require('express-validator');

class CompanyValidation {
    create(req,res,next) {      
        
        const validationRules = [
            body('handle').notEmpty().withMessage('Handle is required'),
            body('name').notEmpty().withMessage('Name is required'),
            body('website').notEmpty().withMessage('Invalid website url'),
            body('country').notEmpty().withMessage('Country is required'),
            body('created_by').notEmpty().withMessage('Company requires a creator'),
        ];
        // Check for validation errors
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    update (req, res, next) {
        const validationRules = [
            param('company_id').isUUID().notEmpty().withMessage('Company ID is required'),
            body('handle').optional().notEmpty().withMessage('Handle cannot be empty'),
            body('name').optional().notEmpty().withMessage('Name cannot be empty'),
            body('website').optional().isURL().withMessage('Invalid website URL'),
            body('country').optional().notEmpty().withMessage('Country cannot be empty'),
        ];
        // Check for validation errors
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    show (req, res, next) {
        const validationRules = [
            param("company_id").isUUID().withMessage("Invalid company ID"),
        ];
        // Check for validation errors
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    delete (req,res,next){
        const validationRules = [
            param("company_id").isUUID().withMessage("Invalid company ID"),
        ];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }

    paginated (req,res,next){
        const validationRules = [];

        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }
}

module.exports = new CompanyValidation();