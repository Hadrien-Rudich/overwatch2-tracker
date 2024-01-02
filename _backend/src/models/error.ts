class CustomError extends Error {
  status: number;
  constructor(message?: string, status?: number) {
    super(message);
    this.status = status || 500;
    this.name = this.constructor.name;
    if (!message) {
      this.setDefaultMessage();
    }
  }

  private setDefaultMessage() {
    this.message = 'An error occurred.';
  }
}

class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message || 'Invalid Request', 400);
  }
}

class NotFoundError extends CustomError {
  constructor(message?: string) {
    super(message || 'Could not find entry', 404);
  }
}

class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(message || 'Internal Server Error', 500);
  }
}

class InvalidCredentialsError extends CustomError {
  constructor(message?: string) {
    super(message || 'Authentication Failed', 401);
  }
}

class InvalidPasswordError extends CustomError {
  constructor(message?: string) {
    super(message || 'Invalid password', 401);
  }
}

class EmailInUseError extends CustomError {
  constructor(message?: string) {
    super(message || 'Email is already in use', 200);
  }
}
class UserNotConnectedError extends CustomError {
  constructor(message?: string) {
    super(message || 'You are not connected', 401);
  }
}

class InvalidTokenError extends CustomError {
  constructor(message?: string) {
    super(message || 'Invalid Token', 403);
  }
}

class ProfileAlreadyExists extends CustomError {
  constructor(message?: string) {
    super(message || 'Profile already exists', 200);
  }
}

export {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  CustomError,
  InvalidCredentialsError,
  EmailInUseError,
  InvalidPasswordError,
  UserNotConnectedError,
  InvalidTokenError,
  ProfileAlreadyExists,
};
