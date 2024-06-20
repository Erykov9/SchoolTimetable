import axios from 'axios';
import ErrorHandler from './ErrorHandler.js';
import { bsonToJs } from './bsonToJs.js';

class DataService {
  URL = process.env.REACT_APP_API_URL;
  AT = localStorage.getItem('AT');

  axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': this.AT ? `Bearer ${this.AT}` : null,
    },
    // withCredentials: true,
  };
 
  async getSchoolPlanConfig(id) {
    try {
      const response = await axios.get(`${this.URL}/schoolPlanConfig/${id}`, this.axiosConfig);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }

  async postData(data, endpoint) {
    try {
      const response = await axios.post(`${this.URL}/${endpoint}`, data, this.axiosConfig);
      console.log("Post Data: ", response.data, endpoint)
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
      const parsedId = bsonToJs(id);
      const response = await axios.delete(`${this.URL}/${endpoint}/${parsedId}`, this.axiosConfig);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }

  async login(endpoint, data) {
    try {
      const response = await axios.post(`${this.URL}/${endpoint}`, data, this.axiosConfig);
      return response.data;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status, error.code);
      return errorHandler.checkErrorStatus();
    }
  }

  async getData(endpoint) {
    try {
      const response = await axios.get(`${this.URL}/${endpoint}`, this.axiosConfig);
      return response;
    } catch (error) {
      const errorHandler = new ErrorHandler(error.message, error.response.status);
      return errorHandler.checkErrorStatus();
    }
  }
};

export default new DataService();