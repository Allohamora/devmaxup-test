const EditPostLog = require('../models/EditPostLog');
const createController = require('../utils/createController');
const getTimestamp = require('../utils/getTimestamp');
const routeDecorator = require('../utils/routeDecorator');
const { Op } = require('sequelize');

const controller = createController('/statistics');
const { router } = controller;

const TIMESTAMP_OFFSET = 24 * 60 * 60;

// get statistics about user
router.get('/edit-posts/:userId', routeDecorator(async ({ reply, req }) => {
  const { params } = req;
  const { userId } = params;

  let result;

  try {
    result = await EditPostLog.findAll({ 
      where: { 
        userId,
        timestamp: {
          [Op.gte]: getTimestamp() - TIMESTAMP_OFFSET
        }
      } 
    });
  } catch (e) {
    return reply({ success: false, message: 'Error with finding logs!', data: e });
  }

  reply({ success: true, message: `Edit-statistics of ${userId} user!`, data: result });
}));

module.exports = controller;