import restApi from './restApi';

const baseUrl = '/users';

class UserRestService {
  getUsersList = async () => {
    const result = await restApi.get(baseUrl);

    /**
     * @type {{data: { data: { id: number, name: string }[] }}}
     */
    const { data: body } = result;

    return body.data;
  };

  /**
   * 
   * @param {string} name 
   */
  newUser = async (name) => {
    const result = await restApi.post(baseUrl, { name })

    const { data: body } = result;

    return body.success;
  }
};

const userService = new UserRestService();
export default userService;
