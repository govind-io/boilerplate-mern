import { PaginationParams } from '../../task';
import Commentutil from '../comments-util';
import { Comment, GetCommentParam, GetCommentsParam } from '../types';
import CommentsRepository from './store/comments-repository';

export default class CommentsReader {
  public static async getComments(
    params: GetCommentsParam,
  ): Promise<Comment[]> {
    const totalCommentsCount = await CommentsRepository.countDocuments({
      task: params.taskId,
    });

    const paginationParams: PaginationParams = {
      page: params.page ? params.page : 1,
      size: params.size ? params.size : totalCommentsCount,
    };
    const startIndex = (paginationParams.page - 1) * paginationParams.size;

    const commentsDb = await CommentsRepository.find({
      task: params.taskId,
    })
      .limit(paginationParams.size)
      .skip(startIndex);

    return commentsDb.map((commentDb) =>
      Commentutil.convertCommentDBToComment(commentDb),
    );
  }

  public static async getComment(
    params: GetCommentParam,
  ): Promise<Comment | undefined> {
    const commentDb = await CommentsRepository.findById(params.commentId);

    if (!commentDb) return undefined;

    return Commentutil.convertCommentDBToComment(commentDb);
  }
}
