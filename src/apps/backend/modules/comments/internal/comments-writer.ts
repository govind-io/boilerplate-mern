import Commentutil from '../comments-util';
import { Comment, CreateCommentsParams } from '../types';
import CommentsRepository from './store/comments-repository';

export default class CommentsWriter {
  public static async createComment(
    params: CreateCommentsParams,
  ): Promise<Comment> {
    const createdTask = await CommentsRepository.create(params);
    return Commentutil.convertCommentDBToComment(createdTask);
  }
}
