const EditLog = require('../models/EditLog');
const createController = require('../utils/createController');
const getTimestamp = require('../utils/getTimestamp');
const { error } = require('../utils/logger');
const { response, responseServerError } = require('../utils/response');
const { Op } = require('sequelize');

const controller = createController('/statistics');
const { router } = controller;

const TIMESTAMP_OFFSET = 24 * 60 * 60;

router.get('/:userId', async (req, res) => {
  try {
    const reply = response(res);

    const { params } = req;
    const { userId } = params;

    let result;

    try {
      result = await EditLog.findAll({ 
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
  } catch (e) {
    error(e);
    return responseServerError(res);
  }
});

module.exports = controller;