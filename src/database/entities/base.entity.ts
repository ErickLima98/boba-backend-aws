import { Model } from 'objection';

export abstract class BaseEntity extends Model {
  readonly id: string;

  static unaccentString(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  static camelCaseToSnakeCase(value: string): string {
    if (!value) {
      return '';
    }
    return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}
