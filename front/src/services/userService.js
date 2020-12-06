import restApi from './restApi';

const baseUrl = '/users';

class UserRestService {
  getUsersList = async () => {
    const result = await restApi.get(baseUrl);

    /**
     * @type {{ data: { id: number, name: string }[] }}
     */
    const { data } = result.data;

    return data;
  };

  /**
   * 
   * @param {{name: string}} params 
   */
  newUser = async ({ name }) => {
    const result = await restApi.post(baseUrl, { name })

    const { success } = result.data;

    return success;
  }
};

const userService = new UserRestService();
export default userService;
