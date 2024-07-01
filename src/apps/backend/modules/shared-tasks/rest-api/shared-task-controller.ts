import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import { Logger } from '../../logger';
import SharedTaskService from '../shared-task-service';
import { SharedTask } from '../types';

export class SharedTaskController {
  shareTask = applicationController(
    async (req: Request<SharedTask>, res: Response) => {
      const { task: taskId, account: accountId } = req.body;

      const sharedTask = await SharedTaskService.shareTask({
        task: taskId,
        account: accountId,
      });

      Logger.info(`created shared task entery: ${JSON.stringify(sharedTask)}`);

      res.status(HttpStatusCodes.OK).send(sharedTask);
    },
  );
}
