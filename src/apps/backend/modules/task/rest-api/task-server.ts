import {
  ApplicationServer,
  NextFunc,
  Request,
  Response,
} from '../../application';
import { CommentsServer } from '../../comments';

import TaskRouter from './task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    const commentsServer = new CommentsServer();

    // Middleware to capture the :id parameter and pass it down as unable to capture the .id param inside controller function of comments
    const captureTaskIdMiddleware = (
      req: Request<{}, { id: string }>,
      _: Response,
      next: NextFunc,
    ) => {
      req.taskId = req.params.id;
      next();
    };

    //each comments belongs to a specific task id
    server.use('/tasks/:id', captureTaskIdMiddleware, commentsServer.server);
    server.use('/tasks', router.router);
  }
}
