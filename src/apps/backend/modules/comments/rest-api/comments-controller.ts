import { Request, Response, applicationController } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentsService from '../comments-service';
import {
  AddCommentParams,
  CommentNotFound,
  PaginationParam,
  UnAuthorisedCommentUpdate,
  UpdateCommentBody,
} from '../types';

export class CommentsController {
  addComment = applicationController(
    async (req: Request<AddCommentParams>, res: Response) => {
      const taskId = req.taskId;
      const selfAccountId = req.accountId;

      const comment = await CommentsService.addComment({
        message: req.body?.message,
        account: selfAccountId,
        task: taskId,
      });

      res.status(HttpStatusCodes.CREATED).send(comment);
    },
  );

  getComments = applicationController(async (req: Request, res: Response) => {
    const taskId = req.taskId;

    const page = +(req.query as PaginationParam).page;
    const size = +(req.query as PaginationParam).size;

    const comments = await CommentsService.getComments({ taskId, page, size });

    res.status(HttpStatusCodes.OK).send(comments);
  });

  getComment = applicationController(async (req: Request, res: Response) => {
    const commentId = req.params.id;

    const comment = await CommentsService.getComment({ commentId });

    if (!comment) {
      throw new CommentNotFound();
    }

    res.status(HttpStatusCodes.OK).send(comment);
  });

  updateComment = applicationController(
    async (req: Request<UpdateCommentBody>, res: Response) => {
      const commentId = req.params.id;

      const accountId = req.accountId;

      const comment = await CommentsService.getComment({ commentId });

      if (!comment) {
        throw new CommentNotFound();
      }

      if (comment.account !== accountId) {
        throw new UnAuthorisedCommentUpdate();
      }

      const updatedComment = await CommentsService.updateComment({
        commentId: commentId,
        message: req.body.message,
      });

      res.status(HttpStatusCodes.OK).send(updatedComment);
    },
  );

  deleteComment = applicationController(async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const accountId = req.accountId;

    const comment = await CommentsService.getComment({ commentId });

    if (!comment) {
      throw new CommentNotFound();
    }

    if (comment.account !== accountId) {
      throw new UnAuthorisedCommentUpdate();
    }

    const deletedComment = await CommentsService.deleteComment({ commentId });

    res.status(HttpStatusCodes.OK).send(deletedComment);
  });
}
