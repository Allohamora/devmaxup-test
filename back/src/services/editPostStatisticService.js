const EditPostStatistic = require("../models/EditPostStatistic");
const { getTodayFormattedDate } = require("../utils/date");

class EditPostStatisticSequilizeService {
  getStatistic = async (userId) => {
    return await EditPostStatistic.findAll({ attributes: ['date', 'count'], where: { userId } });
  };

  createStatisticLog = async (postId, userId) => {
    return await EditPostStatistic.create({ postId, userId });
  };

  updateStasticLogCount = async (id, count) => {
    return await EditPostStatistic.update({ count }, { where: { id } });
  };

  createOrUpdateTodayLog = async (postId, userId) => {
    const findedLog = await EditPostStatistic.findOne({ where: { userId, date: getTodayFormattedDate() } });
    const isExists = !!findedLog;

    if( isExists ) {
      await this.updateStasticLogCount(findedLog.id, findedLog.count + 1);
    } else {
      await this.createStatisticLog(postId, userId);
    }
  };
};

const editPostStatisticService = new EditPostStatisticSequilizeService();

module.exports = editPostStatisticService;