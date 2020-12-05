const User = require('../models/User');
const userSchema = require('../validation/user');
const createController = require('../utils/createController');
const routeDecorator = require('../utils/routeDecorator');

const controller = createController('/users');
const { router } = controller;

// get list of users
router.get('/', routeDecorator(async ({ reply }) => {
  const result = await User.findAll();
  
  reply({ success: true, message: 'List of users', data: result });
}));

// create new user
router.post('/', routeDecorator(async ({ req, reply }) => {
  const { body } = req;
  
  const user = { ...body, id: undefined };

  let result;

  try {
    await userSchema.validate(user);
    result = await User.create(user);
  } catch (e) {
    return reply({ success: false, message: 'error with creating!', data: e });
  }

  reply({ success: true, message: `User with id ${result.dataValues.id} success added!` });
}));

module.exports = controller;
