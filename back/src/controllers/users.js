const User = require('../models/User');
const userSchema = require('../validation/user');
const createController = require('../utils/createController');
const { response, responseServerError } = require('../utils/response');
const { error } = require('../utils/logger');

const controller = createController('/users');
const { router } = controller;

router.get('/', async (req, res) => {
  const reply = response(res);

  try {
    const result = await User.findAll();
  
    reply({ success: true, message: 'List of users', data: result });
  } catch (e) {
    error(e);
    return responseServerError(res);
  }
});

router.post('/', async (req, res) => {
  const reply = response(res);

  try {
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
  } catch (e) {
    error(e);
    return responseServerError(res);
  }
});

module.exports = controller;
