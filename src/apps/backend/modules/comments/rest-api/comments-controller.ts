import { Request, Response, applicationController } from '../../application';
import { HttpStatusCodes } from '../../http';

export class CommentsController {
  hello = applicationController(async (req: Request<any>, res: Response) => {
    res.status(HttpStatusCodes.OK).send('hello ' + req.taskId);
  });
}
