import restApi from './restApi';

const baseUrl = '/posts';

class PostsRestService {

  /**
   * 
   * @param {{userId: string}} params 
   */
  getPosts = async ({ userId }) => {
    const result = await restApi.get(`${baseUrl}/${userId}`);

    /**
     * @type {{ data: { id: number; title: string; body: string; userId: number }[] }}
     */
    const { data } = result.data;

    return data;
  }

  /**
   * 
   * @param {{ userId: number, title: string, body: string }} params 
   */
  newPost = async ({ userId, title, body }) => {
    const result = await restApi.post(baseUrl, { userId, title, body });

    const { success } = result.data;

    return success;
  }
};

const postsService = new PostsRestService();

export default postsService;
