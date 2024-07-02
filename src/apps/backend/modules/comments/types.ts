import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Comment {
  id: string;
  task: string;
  message: string;
  account: string;
}

export type AddCommentParams = {
  message: string;
};

export type CreateCommentsParams = AddCommentParams & {
  account: string;
  task: string;
};

export enum CommentsErrorCode {
  EMTPY_COMMENT = 'COMMENT_ERR_01',
}

export class EmptyComment extends ApplicationError {
  code: CommentsErrorCode;

  constructor() {
    super(`Comment message can't be empty`);
    this.code = CommentsErrorCode.EMTPY_COMMENT;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
