import restApi from './restApi';

const baseUrl = '/statistics';

class StatisticsRestService {
  getEditPostStatistics = async ({ userId }) => {
    const result = await restApi.get(`${baseUrl}/edit-posts/${userId}`);

    /**
     * @type {{ data: { date: string, count: number }[] }}
     */
    const { data } = result.data;

    return data;
  }
}

const statisticsService = new StatisticsRestService();

export default statisticsService;