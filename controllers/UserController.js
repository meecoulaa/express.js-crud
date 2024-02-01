const { validationResult } = require('express-validator');
const UserService = require('../service/UserService');

class UserController {
    async create(req, res) {
        try {
            const user = await UserService.create(req.body);

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async show(req, res) {
        try {
            const user = await UserService.getById(req.params.user_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async paginated(req, res) {
        try {
            const { search, sortField, sortOrder, page, limit, filterBy } = req.query;
            const userList = await UserService.paginated({ search, sortField, sortOrder, page, limit, filterBy });

            res.status(200).json(userList);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await UserService.update(req.params.user_id, req.body);

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async delete(req, res) {
        try {
            const deletedUser = await UserService.delete(req.params.user_id);

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController();