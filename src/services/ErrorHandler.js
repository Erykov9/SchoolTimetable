export default class ErrorHandler {
  status;
  error;
  errorMessage;
  code;

  constructor(error = null, status = null, code = null) {
    this.error = error;
    this.status = status;
    this.code = code;
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

    if (this.status === 422) {
      this.errorMessage = 'Wystąpił błąd serwera. Nieprawidłowy format danych';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
      };
    }

    if (this.code === "ERR_NETWORK") {
      this.errorMessage = 'Problem z połączeniem';
      return {
        error: this.error,
        errorMessage: errorMessage || this.errorMessage,
        status: this.status,
        code: this.code,
      };
    }

    return {
      error: this.error,
      errorMessage: this.errorMessage,
      status: this.status,
      code: this.code
    };
  }
}

