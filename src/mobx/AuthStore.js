import { action, computed, makeAutoObservable, toJS, observable } from "mobx";
import DataService from "../services/DataService";
import SchoolInfoStore from "./SchoolInfoStore";


class AuthStore {
    user = null;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    async login (data) {
      const response = await DataService.login('login', data);

      if(response.token) {
        localStorage.setItem('AT', response.token);
        await this.getUser();
      };
      
      return response;
    }

    @action
    async getUser() {
      const user = await DataService.getData(`user`);
      SchoolInfoStore.setSchoolPlanId(user.data[0].schoolPlanConfigs[0]._id.$oid);

      this.user = {
        id: user.data[0]._id,
        email: user.data[0].email,
      };
    }

    async isLogged()  {
      const token = localStorage.getItem('AT');
      if(token) {
        await this.getUser();
        return true;
      }
      return false;
    }
};

export default new AuthStore();