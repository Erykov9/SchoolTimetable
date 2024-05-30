export default class ErrorHandler {
  status;
  error;
  errorMessage;

  constructor(error = null, status = null) {
    this.error = error;
    this.status = status;
  }

  checkErrorStatus(errorMessage = null) {
    if (this.status === 400) {
      this.errorMessage = 'Błędne zapytanie';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
      };
    }
    if (this.status === 401) {
      this.errorMessage = 'Nie posiadasz uprawnień do wykonania tej operacji';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
      };
    }
    if (this.status === 403) {
      this.errorMessage = 'Brak dostępu';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
      };
    }
    if (this.status === 404) {
      this.errorMessage = 'Nie znaleziono zasobów';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
      };
    }
    if (this.status === 500) {
      this.errorMessage = 'Wystąpił błąd serwera';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
      };
    }

    return {
      error: this.error,
      errorMessage: this.errorMessage,
      status: this.status,
    };
  }
}

