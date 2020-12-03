const createController = require('../utils/createController');
const User = require('../models/User');
const userSchema = require('../validation/user');
const response = require('../utils/response');

const controller = createController('/users');
const { router } = controller;

router.get('/', async (req, res) => {
  const result = await User.findAll();

  res.send(result);
});

router.post('/', async (req, res) => {
  const { body } = req;

  const reply = response(res);

  const isValid = await userSchema.isValid(body);

  if( !isValid ) return reply({ success: false,  message: 'not Valid' });

  try {
    await User.create(body);
  } catch (e) {
    return reply({ success: false, message: 'error with saving!', data: e });
  }

  reply({ success: true, message: 'success added!' });
});

module.exports = controller;
