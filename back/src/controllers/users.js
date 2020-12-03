const createController = require('../utils/createController');

const controller = createController('/users');
const { router } = controller;

router.get('/', (req, res) => res.send({ test: true }));

module.exports = controller;
