import Commentutil from '../comments-util';
import {
  Comment,
  CreateCommentsParams,
  DeleteCommentParam,
  UpdateCommentParam,
} from '../types';
import CommentsRepository from './store/comments-repository';

export default class CommentsWriter {
  public static async createComment(
    params: CreateCommentsParams,
  ): Promise<Comment> {
    const createdComment = await CommentsRepository.create(params);
    return Commentutil.convertCommentDBToComment(createdComment);
  }

  public static async updateComment({
    commentId,
    message,
  }: UpdateCommentParam): Promise<Comment> {
    const updatedComment = await CommentsRepository.findByIdAndUpdate(
      commentId,
      { message },
      { new: true },
    );
    return Commentutil.convertCommentDBToComment(updatedComment);
  }

  public static async deleteComment({
    commentId,
  }: DeleteCommentParam): Promise<Comment> {
    const deletedComment = await CommentsRepository.findByIdAndDelete(
      commentId,
    );
    return Commentutil.convertCommentDBToComment(deletedComment);
  }
}
