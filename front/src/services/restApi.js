import axios from 'axios';
import * as Axios from 'axios';
import { API_URL, isProduction } from '../const';

const config = {};

if( !isProduction ) {
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  };
};

/**
 * 
 * @param {string} url 
 */
const getUrl = (url) => `${API_URL}${url}`;

/**
 * 
 * @param {(fullUrl: string, data?: { [key: string]: any }) => Promise} handler 
 * @returns {(url: string, data?: { [key: string]: any }) => 
 * Promise<Axios.AxiosResponse<{ 
    * success: boolean, 
    * message: string, 
    * data?: { [key: string]: any } 
  * }> | undefined> }
 */
const requestDecorator = (handler) => async (url, data) => {
  const fullUrl = getUrl(url);
  return await handler(fullUrl, data);
}

class RestApi {
  post = requestDecorator(async (fullUrl, data) => await axios.post(fullUrl, data, config))

  put = requestDecorator(async (fullUrl, data) => await axios.put(fullUrl, data, config))

  get = requestDecorator(async (fullUrl) => await axios.get(fullUrl, config))
};

const restApi = new RestApi();

export default restApi;
