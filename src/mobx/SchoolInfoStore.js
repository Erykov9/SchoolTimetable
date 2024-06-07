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

  constructor() {
    makeAutoObservable(this);
    this.getSchoolPlanConfig();
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
      this.schoolPlanId = data[0]._id;
      return;
    }

    this.schoolPlanConfig.error = {
      message: data.errorMessage,
      status: data.status,
      error: data.error,
    };
  }

  // CLASSES
  addManyClasses(classes) {
    let wrongClasses = [];

    for (const c of classes) {
      const response = this.addClass({ name: c });

      if (response?.error) {
        wrongClasses.push(c);
      }
    }

    if (wrongClasses.length === classes.length) {
      return { error: "Klasy nie zostały dodane, spróbuj ponownie" };
    }

    if (wrongClasses.length > 0) {
      return {
        warning: `Klasy/a (${wrongClasses.join(
          ", "
        )}) już istnieją. Reszta klas została dodana pomyślnie`,
      };
    }
  }

  // DO POPRAWY PO ODPALENIU NOWEGO OBRAZU BACKENDU
  @action
  async addClass(data) {
    if (
      this.classes.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("", 400);
      return error.checkErrorStatus();
    }
    const newData = {
      school_plan_config_id: this.schoolPlanId,
      name: data.name,
    };

    const response = await DataService.postData(newData, 'studentClass');
    console.log(response)
    if (response?.error) {
      return response;
    }
    this.classes.data = [...this.classes.data, response];
  }

  @action
  editClass(data) {
    if (this.classes.data.some((item) => item.name === data.name)) {
      return { error: "Klasa o tej nazwie już istnieje" };
    }
    const index = this.classes.data.findIndex((item) => item.id === data.id);
    this.classes.data[index] = data;
  }

  @action
  deleteClass(id) {
    const newClasses = this.classes.data.filter((item) => item.id !== id);
    this.classes.data = newClasses;
  }

  // LABELS

  @action
  async addManyLabels(labels) {
    let wrongLabels = [];

    for (const c of labels) {
      const response = await this.addLabel({ name: c });

      if (response?.error) {
        wrongLabels.push(c);
      }
    }

    if (wrongLabels.length === labels.length) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(
        "Etykiety nie zostały dodane, spróbuj ponownie"
      );
    }

    if (wrongLabels.length > 0) {
      return {
        warning: `Klasy/a (${wrongLabels.join(
          ", "
        )}) już istnieją. Reszta klas została dodana pomyślnie`,
      };
    }
  }

  @action
  async addLabel(data) {
    if (
      this.labels.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Etykieta o tej nazwie już istnieje");
    }

    const newData = {
      school_plan_config_id: this.schoolPlanId,
      name: data.name,
    };

    const response = await DataService.postData(newData, "lessonLabel");
    if (response?.error) {
      return response;
    }

    this.labels.data = [...this.labels.data, response];
  }

  @action
  async editLabel(data) {
    if (
      this.labels.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Etykieta o tej nazwie już istnieje");
    }

    const response = await DataService.editData(data, "lessonLabel", data._id);
    if (response?.error) {
      return response;
    }
    const index = this.labels.data.findIndex((item) => item._id === data._id);
    this.labels.data[index] = data;
  }

  @action
  async deleteLabel(id) {
    console.log("ID: ", toJS(id))
    const response = await DataService.deleteData("lessonLabel", id);

    if (response.error) {
      return response;
    }

    const newLabels = this.labels.data.filter((item) => item._id !== id);
    this.labels.data = newLabels;
  }

  // TEACHERS
  @action
  async addTeacher(data) {
    if (
      this.teachers.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Nauczyciel o tej nazwie już istnieje");
    }

    const newData = {
      school_plan_config_id: this.schoolPlanId,
      name: data.name,
    };

    const response = await DataService.postData(newData, "teacher");
    if (response?.error) {
      return response;
    }

    this.teachers.data = [...this.teachers.data, response];
  }

  @action
  async editTeacher(data) {
    if (
      this.teachers.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Nauczyciel o tej nazwie już istnieje");
    }

    const response = await DataService.editData(data, "teacher", data._id);
    if (response?.error) {
      return response;
    }

    const index = this.teachers.data.findIndex((item) => item._id === data._id);
    this.teachers.data[index] = data;
  }

  @action
  async deleteTeacher(id) {
    const response = await DataService.deleteData("teacher", id);

    if (response.error) {
      return response;
    }

    const newTeachers = this.teachers.data.filter((item) => item._id !== id);
    this.teachers.data = newTeachers;
  }

  @action
  async addManyTeachers(teachers) {
    let wrongTeachers = [];

    for (const c of teachers) {
      const response = await this.addTeacher({ name: c });

      if (response?.error) {
        wrongTeachers.push(c);
      }
    }

    if (wrongTeachers.length === teachers.length) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(
        "Nauczyciele nie zostali dodani, spróbuj ponownie"
      );
    }

    if (wrongTeachers.length > 0) {
      return {
        warning: `Nauczyciele/a (${wrongTeachers.join(
          ", "
        )}) już istnieją. Reszta nauczycieli została dodana pomyślnie`,
      };
    }
  }

  @action
  async addClassroom(data) {
    if (
      this.classRooms.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Sala o tej nazwie już istnieje");
    }

    const newData = {
      school_plan_config_id: this.schoolPlanId,
      name: data.name,
    };

    const response = await DataService.postData(newData, "classroom");
    if (response?.error) {
      return response;
    }

    this.classRooms.data = [...this.classRooms.data, response];
  }

  @action
  async editClassroom(data) {
    if (
      this.classRooms.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Sala o tej nazwie już istnieje");
    }

    const response = await DataService.editData(data, "classroom", data._id);
    if (response?.error) {
      return response;
    }

    const index = this.classRooms.data.findIndex(
      (item) => item._id === data._id
    );
    this.classRooms.data[index] = data;
  }

  @action
  async deleteClassroom(id) {
    const response = await DataService.deleteData("classroom", id);

    if (response.error) {
      return response;
    }

    const newClassrooms = this.classRooms.data.filter(
      (item) => item._id !== id
    );
    this.classRooms.data = newClassrooms;
  }

  @action
  async addManyClassrooms(classrooms) {
    let wrongClassrooms = [];

    for (const c of classrooms) {
      const response = await this.addClassroom({ name: c });

      if (response?.error) {
        wrongClassrooms.push(c);
      }
    }

    if (wrongClassrooms.length === classrooms.length) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(
        "Sale nie zostały dodane, spróbuj ponownie"
      );
    }

    if (wrongClassrooms.length > 0) {
      return {
        warning: `Sale/a (${wrongClassrooms.join(
          ", "
        )}) już istnieją. Reszta sal została dodana pomyślnie`,
      };
    }
  }

  @action
  async addSubject(data) {
    if (
      this.subjects.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Przedmiot o tej nazwie już istnieje");
    }

    const newData = {
      school_plan_config_id: this.schoolPlanId,
      name: data.name,
    };

    const response = await DataService.postData(newData, "lessonType");
    if (response?.error) {
      return response;
    }

    this.subjects.data = [...this.subjects.data, response];
  }

  @action
  async editSubject(data) {
    if (
      this.subjects.data.some(
        (item) => item.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus("Przedmiot o tej nazwie już istnieje");
    }

    const response = await DataService.editData(data, "lessonType", data._id);
    if (response?.error) {
      return response;
    }

    const index = this.subjects.data.findIndex((item) => item._id === data._id);
    this.subjects.data[index] = data;
  }

  @action
  async deleteSubject(id) {
    const response = await DataService.deleteData("lessonType", id);

    if (response.error) {
      return response;
    }

    const newSubjects = this.subjects.data.filter((item) => item._id !== id);
    this.subjects.data = newSubjects;
  }

  @action
  async addManySubjects(subjects) {
    let wrongSubjects = [];

    for (const c of subjects) {
      const response = await this.addSubject({ name: c });

      if (response?.error) {
        wrongSubjects.push(c);
      }
    }

    if (wrongSubjects.length === subjects.length) {
      const error = new ErrorHandler("Error", 400);
      return error.checkErrorStatus(
        "Przedmioty nie zostały dodane, spróbuj ponownie"
      );
    }

    if (wrongSubjects.length > 0) {
      return {
        warning: `Przedmioty/a (${wrongSubjects.join(
          ", "
        )}) już istnieją. Reszta przedmiotów została dodana pomyślnie`,
      };
    }
  }

  @computed
  get formattedStudentCount() {
    return `Total students: ${this.studentCount}`;
  }
}

export default new SchoolInfoStore();
