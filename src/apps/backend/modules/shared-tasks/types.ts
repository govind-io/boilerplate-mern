import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export type SharedTask = {
  task: string;
  account: string;
};

export class SerialiseSharedTask {
  task: string;
  account: string;
}

export enum SharedTaskErrorCode {
  ACCOUNT_NOT_FOUND = 'SHARED_TASK_ACCOUT_ERR_01',
}

export class SharedTaskAccountNotFound extends ApplicationError {
  code: SharedTaskErrorCode;

  constructor(accountId: string) {
    super(`Account with ${accountId} not found.`);
    this.code = SharedTaskErrorCode.ACCOUNT_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
