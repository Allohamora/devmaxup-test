const EditPostLog = require('../models/EditPostLog');
const createController = require('../utils/createController');
const routeDecorator = require('../utils/routeDecorator');

const controller = createController('/statistics');
const { router } = controller;

// get statistics about user
router.get('/edit-posts/:userId', routeDecorator(async ({ reply, req }) => {
  const { params } = req;
  const { userId } = params;

  let result;

  // await Promise.all(  new Array(10).fill(null).map(() => EditPostLog.create({
  //   postId: 1,
  //   userId: 1,
  //   timestamp: getTimestamp() - TIMESTAMP_OFFSET
  // })));

  try {
    result = await EditPostLog.findAll({ 
      attributes: ['id', 'timestamp'],
      where: { 
        userId
      } 
    });
  } catch (e) {
    return reply({ success: false, message: 'Error with finding logs!', data: e });
  }

  reply({ success: true, message: `Edit-statistics of ${userId} user!`, data: result });
}));

module.exports = controller;