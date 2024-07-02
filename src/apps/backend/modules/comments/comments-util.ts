import { CommentsDb } from './internal/store/comments-db';
import { Comment } from './types';

export default class Commentutil {
  public static convertCommentDBToComment(commentDb: CommentsDb): Comment {
    const comment = new Comment();
    comment.id = commentDb._id.toString();
    comment.account = commentDb.account.toString();
    comment.message = commentDb.message;
    comment.task = commentDb.task.toString();
    return comment;
  }
}
