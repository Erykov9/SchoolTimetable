import axios from 'axios';
import ErrorHandler from './ErrorHandler.js';
import { bsonToJs } from './bsonToJs.js';

class DataService {
  URL = process.env.REACT_APP_API_URL;
  axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  async getSchoolPlanConfig() {
    try {
      const response = await axios.get(`${this.URL}/schoolPlanConfig/664a19c615671d1f778fe8f8`);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }

  async postData(data, endpoint) {
    try {
      const response = await axios.post(`${this.URL}/${endpoint}`, data, this.axiosConfig);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }

  async editData(data, endpoint, id) {
    try {
      const parsedId = bsonToJs(id);
      const response = await axios.put(`${this.URL}/${endpoint}/${parsedId}`, data, this.axiosConfig);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }

  async deleteData(endpoint, id) {
    try {
      console.log(id, endpoint)
      const parsedId = bsonToJs(id);
      const response = await axios.delete(`${this.URL}/${endpoint}/${parsedId}`, this.axiosConfig);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }
  
};

export default new DataService();