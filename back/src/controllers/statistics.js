const editPostStatisticService = require('../services/editPostStatisticService');
const createController = require('../utils/createController');
const routeDecorator = require('../utils/routeDecorator');

const controller = createController('/statistics');
const { router } = controller;

// get statistics about user
router.get('/edit-posts/:userId', routeDecorator(async ({ reply, req }) => {
  const { params } = req;
  const { userId } = params;

  let result;

  try {
    result = await editPostStatisticService.getStatistic(userId);
  } catch (e) {
    return reply({ success: false, message: 'Error with finding logs!', data: e });
  }

  reply({ success: true, message: `Edit-statistics of ${userId} user!`, data: result });
}));

module.exports = controller;