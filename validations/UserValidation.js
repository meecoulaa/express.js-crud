const { body,param, validationResult } = require('express-validator');
class UserValidation {
    create(req, res, next) {
        const validationRules = [
            body('first_name').notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email').isEmail().withMessage('Invalid email address'),
            body('password').notEmpty().withMessage('Password is required'),
        ];
        Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        });
    }
    update(req, res, next) {
        const validationRules = [
            body('first_name').optional().notEmpty().withMessage('Name cannot be empty'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email').optional().isEmail().withMessage('Invalid email address'),
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
            param('user_id').isUUID().withMessage('User ID is required'),
        ];
        
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
            param("user_id").isUUID().withMessage("Invalid company ID"),
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
module.exports = new UserValidation();