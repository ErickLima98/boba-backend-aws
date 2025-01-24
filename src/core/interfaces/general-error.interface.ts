export interface ICommonError {
  status_code: number;
  message: string;
  error: string;
  validation_errors: object[];
}
