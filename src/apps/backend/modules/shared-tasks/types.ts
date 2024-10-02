import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';
import { TaskService } from '../task';

export type SharedTask = {
  task: string;
  account: string;
};

export class SerialiseSharedTask {
  task: Awaited<ReturnType<typeof TaskService.getTaskById>>;
  account: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

export enum SharedTaskErrorCode {
  ACCOUNT_NOT_FOUND = 'SHARED_TASK_ERR_01',
  TASK_ALREADY_SHARED = 'SHARED_TASK_ERR_02',
  SELF_TASK_SELF_SHARE = 'SHARED_TASK_ERR_03',
  UNAUTHORISED_TASK_SHARING = 'SHARED_TASK_ERR_04',
}

export class SharedTaskAccountNotFound extends ApplicationError {
  code: SharedTaskErrorCode;

  constructor(accountId: string) {
    super(`Account with ${accountId} not found.`);
    this.code = SharedTaskErrorCode.ACCOUNT_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class CanNotShareTaskToSelf extends ApplicationError {
  code: SharedTaskErrorCode;

  constructor() {
    super(`Can not share your task with yourself`);
    this.code = SharedTaskErrorCode.SELF_TASK_SELF_SHARE;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class UnAuthorizedTaskSharing extends ApplicationError {
  code: SharedTaskErrorCode;

  constructor() {
    super(`You are not allowed to share tasks that you don't own`);
    this.code = SharedTaskErrorCode.UNAUTHORISED_TASK_SHARING;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class TaskAlreadSharedError extends ApplicationError {
  code: SharedTaskErrorCode;

  constructor(taskId: string, accountId: string) {
    super(`Task ${taskId} is already shared with ${accountId}`);
    this.code = SharedTaskErrorCode.TASK_ALREADY_SHARED;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
export type PageParams = { page: number; size: number };

export type GetAllSharedTaskParams = {
  accountId: string;
} & PageParams;
