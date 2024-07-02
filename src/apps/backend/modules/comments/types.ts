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

export type PaginationParam = {
  size: number;
  page: number;
};

export type GetCommentsParam = {
  taskId: string;
} & PaginationParam;

export type GetCommentParam = {
  commentId: string;
};

export type UpdateCommentParam = {
  commentId: string;
  message: string;
};

export type UpdateCommentBody = {
  message: string;
};

export type DeleteCommentParam = {
  commentId: string;
};

export enum CommentsErrorCode {
  EMTPY_COMMENT = 'COMMENT_ERR_01',
  NOT_FOUND_ERR = 'COMMENT_ERR_02',
  UNAUTHORISED_UPDATE = 'COMMENT_ERR_03',
}

export class EmptyComment extends ApplicationError {
  code: CommentsErrorCode;

  constructor() {
    super(`Comment message can't be empty`);
    this.code = CommentsErrorCode.EMTPY_COMMENT;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class CommentNotFound extends ApplicationError {
  code: CommentsErrorCode;

  constructor() {
    super(`Comment not found`);
    this.code = CommentsErrorCode.NOT_FOUND_ERR;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class UnAuthorisedCommentUpdate extends ApplicationError {
  code: CommentsErrorCode;

  constructor() {
    super(`You are not authorised to update this comment`);
    this.code = CommentsErrorCode.UNAUTHORISED_UPDATE;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
