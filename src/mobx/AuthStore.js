import { action, computed, makeAutoObservable, toJS, observable } from "mobx";
import DataService from "../services/DataService";


class AuthStore {
    user;

    constructor() {
        makeAutoObservable(this)
    }

    @observable user = null;

    @action
    async login (data) {
      const response = await DataService.login('login', data);
      if(response.token) {
        localStorage.setItem('AT', response.token);
      };
      
      return response;
    }

    @action
    setUser = (user) => {
        this.user = user;
    }

    @computed
    get getUser() {
        return toJS(this.user);
    }
};

export default new AuthStore();