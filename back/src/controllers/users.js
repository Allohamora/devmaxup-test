const createController = require('../utils/createController');
const routeDecorator = require('../utils/routeDecorator');
const usersService = require('../services/usersService');

const controller = createController('/users');
const { router } = controller;

// get list of users
router.get('/', routeDecorator(async ({ reply }) => {
  const result = await usersService.getUsers();
  
  reply({ success: true, message: 'List of users', data: result });
}));

// create new user
router.post('/', routeDecorator(async ({ req, reply }) => {
  const { body } = req;
  
  const userData = { ...body, id: undefined };

  let result;

  try {
    result = await usersService.validateAndCreateUser(userData);
  } catch (e) {
    return reply({ success: false, message: 'error with creating!', data: e });
  }

  reply({ success: true, message: `User with id ${result.dataValues.id} success added!` });
}));

module.exports = controller;
