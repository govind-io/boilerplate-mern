import { TaskService } from '../task';
import CommentsReader from './internal/comments-reader';
import CommentsWriter from './internal/comments-writer';
import {
  CreateCommentsParams,
  EmptyComment,
  GetCommentParam,
  GetCommentsParam,
  DeleteCommentParam,
  UpdateCommentParam,
} from './types';

export default class CommentsService {
  public static async addComment(params: CreateCommentsParams) {
    if (!params.message) {
      throw new EmptyComment();
    }

    //if task does not exist or the user does not own that task throw error
    await TaskService.getTaskForAccount({
      taskId: params.task,
      accountId: params.account,
    });

    return await CommentsWriter.createComment(params);
  }

  public static async getComments(params: GetCommentsParam) {
    //if task does not exist throw error
    await TaskService.getTaskById({ taskId: params.taskId });

    return await CommentsReader.getComments(params);
  }

  public static async getComment(params: GetCommentParam) {
    return await CommentsReader.getComment(params);
  }

  public static async updateComment(params: UpdateCommentParam) {
    return await CommentsWriter.updateComment(params);
  }

  public static async deleteComment(params: DeleteCommentParam) {
    return await CommentsWriter.deleteComment(params);
  }
}
