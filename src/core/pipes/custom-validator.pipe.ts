import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export class ErrorValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      exceptionFactory: (responseErrors: ValidationError[]) => {
        const parsedErrors = [];
        responseErrors.forEach((error) => {
          const errorMessages = this.parseValidationError(error);
          parsedErrors.push(...errorMessages);
        });
        return new BadRequestException({
          status_code: 400,
          message: 'Error with the request. Please try again',
          validation_errors: parsedErrors,
          error: 'Bad Request',
        });
      },
    });
  }

  parseValidationError(validationError: ValidationError) {
    if (validationError.constraints) {
      if (validationError.constraints['isNotEmpty']) {
        return [
          {
            [validationError.property]: [
              validationError.constraints['isNotEmpty'],
            ],
          },
        ];
      } else {
        const parsedErrors = [];
        for (const constraint in validationError.constraints) {
          parsedErrors.push(validationError.constraints[constraint]);
        }
        return [{ [validationError.property]: parsedErrors }];
      }
    } else if (validationError.children) {
      let parsedErrors = [];
      validationError.children.forEach((subError) => {
        parsedErrors = [
          ...parsedErrors,
          ...this.parseValidationError(subError),
        ];
      });
      return [{ [validationError.property]: parsedErrors }];
    }
  }
}
