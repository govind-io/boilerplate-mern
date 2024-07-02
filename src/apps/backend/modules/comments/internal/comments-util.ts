import { Comment } from '../types';
import { CommentsDb } from './store/comments-db';

export default class TaskUtil {
  public static convertCommentDBToComment(commentDb: CommentsDb): Comment {
    const comment = new Comment();
    comment.id = commentDb._id.toString();
    comment.account = commentDb.account.toString();
    comment.task = commentDb.task.toString();
    comment.message = commentDb.message;
    return comment;
  }
}
