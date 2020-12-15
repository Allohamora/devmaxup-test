const User = require("../models/User");
const userSchema = require("../validation/user");

const validateNewUser = async (userData) => await userSchema.validate(userData);

class UsersSequlizeService {
  getUsers = async () => {
    return await User.findAll();
  };

  createUser = async (userData) => {
    return await User.create(userData);
  };

  validateAndCreateUser = async (userData) => {
    await validateNewUser(userData);
    
    return await this.createUser(userData);
  }
};

const usersService = new UsersSequlizeService();

module.exports = usersService;