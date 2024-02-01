const { Op } = require('sequelize');
const initUserModel = require('../models/User');
const sequelize = require('../config/db.config.js');

const User = initUserModel(sequelize);

class UserRepository {
  async create(userData) {
    const newUser = await User.create(userData);
    return newUser;
  }

  async getById(userId){
    const user = await User.findByPk(userId);
    return user;
  }

  async paginated({ search, sortField, sortOrder, page, limit, filterBy }){
    limit = limit ? limit : 10;
    const offset = page&&limit? (page - 1) * limit : 1;
    sortOrder = sortOrder ? sortOrder : 'desc';
    sortField = sortField ? sortField : 'created_at';
    const whereClause = search ? {[Op.or]: 
        [
          { email: { [Op.iLike]: `%${search}%` } },
          { first_name: { [Op.iLike]: `%${search}%` } },
          { last_name: { [Op.iLike]: `%${search}%` } },
        ],
    }: {};

    const conditions = {
      where: whereClause ? whereClause : "",
      order: [[sortField, sortOrder === 'desc' ? 'DESC' : 'ASC']],
      offset: offset,
      limit: limit,
    };

    // Retrieve paginated list of companies from the database
    const companyList = await User.findAll(conditions);
    return companyList;
  }

  async update (userId, userData){
    const [updatedRowCount, updatedUsers] = await User.update(userData, {
      where: {id: userId},
      returning: true,
    });
    if(updatedRowCount === 0){
      return null;
    }
    return updatedUsers[0];
  }

  async delete(userId){
    const result = await User.destroy({
      where: {id: userId},
    });
    return result;
  }
}


module.exports = new UserRepository();