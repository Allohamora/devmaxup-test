const createController = require('../utils/createController');
const User = require('../models/User');
const userSchema = require('../validation/user');
const response = require('../utils/response');

const controller = createController('/users');
const { router } = controller;

router.get('/', async (req, res) => {
  const result = await User.findAll();
  const reply = response(res);

  reply({ success: true, message: 'List of users', data: result });
});

router.post('/new', async (req, res) => {
  const { body } = req;

  const reply = response(res);

  const user = { ...body, id: undefined };

  const isValid = await userSchema.isValid(user);

  if( !isValid ) return reply({ success: false,  message: 'not Valid' });

  try {
    await User.create(user);
  } catch (e) {
    return reply({ success: false, message: 'error with saving!', data: e });
  }

  reply({ success: true, message: 'success added!' });
});

module.exports = controller;
