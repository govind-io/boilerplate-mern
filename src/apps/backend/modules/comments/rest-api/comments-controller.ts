import { Request, Response, applicationController } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentsService from '../comments-service';
import { AddCommentParams } from '../types';

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
}
