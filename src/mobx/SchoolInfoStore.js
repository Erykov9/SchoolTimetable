import { action, computed, makeAutoObservable, toJS } from "mobx";
import DataService from "../services/DataService";
import ErrorHandler from "../services/ErrorHandler";

class SchoolInfoStore {
  schoolName = "Zespół Szkół Zawodowych nr 2 w Wypizdowie Wielkim";
  schoolPlanId;

  schoolPlanConfig = {
    data: [],
    loading: false,
    error: null,
  };

  classRooms = {
    data: [],
    loading: false,
    error: null,
  };

  teachers = {
    data: [],
    loading: false,
    error: null,
  };

  subjects = {
    data: [],
    loading: false,
    error: null,
  };

  labels = {
    data: [],
    loading: false,
    error: null,
  };

  classes = {
    data: [],
    loading: false,
    error: null,
  };

  groups = {
    data: [],
    loading: false,
    error: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSchoolName(name) {
    this.schoolName = name;
  }

  // SCHOOL PLAN CONFIG
  @action
  async getSchoolPlanConfig() {
    this.schoolPlanConfig.loading = true;
    const data = await DataService.getSchoolPlanConfig();
    this.schoolPlanConfig.loading = false;

    if (!data.error) {
      this.schoolPlanConfig.data = data;
      this.classRooms.data = data[0].classrooms;
      this.classes.data = data[0].studentClasses;
      this.labels.data = data[0].lessonLabels;
      this.subjects.data = data[0].lessonTypes;
      this.teachers.data = data[0].teachers;
      this.groups.data = data[0].groups;
      this.schoolPlanId = data[0]._id;
      return;
    }

    this.schoolPlanConfig.error = {
      message: data.errorMessage,
      status: data.status,
      error: data.error,
    };
  }

  @action 
  async addItem(data, type, polishType, endpoint) {
    if (
      this[type].data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(`${polishType.toUpperCase()} o tej nazwie już istnieje`);
    }

    const newData = {
      school_plan_config_id: this.schoolPlanId,
      name: data.name,
    };

    const response = await DataService.postData(newData, endpoint);
    if (response?.error) {
      return response;
    }

    this[type].data = [...this[type].data, response];
  }

  @action
  async editItem(data, type, polishType, endpoint) {
    if (
      this[type].data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(`${polishType.toUpperCase()} o tej nazwie już istnieje`);
    }

    const response = await DataService.editData(data, endpoint, data._id);
    if (response?.error) {
      return response;
    }

    const index = this[type].data.findIndex((item) => item._id === data._id);
    this[type].data[index] = data;
  }

  @action
  async deleteItem(id, type, endpoint) {
    const response = await DataService.deleteData(endpoint, id);

    if (response.error) {
      return response;
    }

    const newItems = this[type].data.filter((item) => item._id !== id);
    this[type].data = newItems;
  }

  @action
  async addManyItems(items, type, polishTypes, endpoint) {
    let wrongItems = [];

    for (const c of items) {
      const response = await this.addItem({ name: c }, type, polishTypes, endpoint);

      if (response?.error) {
        wrongItems.push(c);
      }
    }

    if (wrongItems.length === items.length) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(
        `${polishTypes.toUpperCase()} nie zostały dodane, spróbuj ponownie`
      );
    }

    if (wrongItems.length > 0) {
      return {
        warning: `${polishTypes.toUpperCase()} (${wrongItems.join(
          ", "
        )}) już istnieją. Reszta została dodana pomyślnie`,
      };
    }
  }

  @computed
  get formattedStudentCount() {
    return `Total students: ${this.studentCount}`;
  }
}

export default new SchoolInfoStore();
