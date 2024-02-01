const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');

class UserService {
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async create(userData){
    const newUser = await UserRepository.create({
        email: userData.email.toLowerCase(),
        first_name: userData.first_name,
        last_name: userData.last_name,
        password: await this.hashPassword(userData.password)
        });
    return newUser;
    }
    
    async getById(userId){
        const user = await UserRepository.getById(userId);
        return user;
    }

    async paginated({ search, sortField, sortOrder, page, limit, filterBy }){
        const userList = await UserRepository.paginated({ search, sortField, sortOrder, page, limit, filterBy });
        return userList;
    }

    async update(userId, userData){
        const updatedUser = await UserRepository.update(userId, userData);
        return updatedUser;
    }

    async delete(userId){
        const existingUser = await UserRepository.getById(userId);
        return await UserRepository.delete(userId);
    }
}

module.exports = new UserService();