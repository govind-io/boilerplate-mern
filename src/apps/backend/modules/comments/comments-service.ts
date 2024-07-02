import { TaskService } from '../task';
import CommentsWriter from './internal/comments-writer';
import { CreateCommentsParams, EmptyComment } from './types';

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
}
