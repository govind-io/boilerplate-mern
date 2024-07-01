import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import { Logger } from '../../logger';
import SharedTaskService from '../shared-task-service';
import {
  GetAllSharedTaskParams,
  PageParams,
  SerialiseSharedTask,
  SharedTask,
} from '../types';
import SharedTaskUtils from './shared-task-utils';

export class SharedTaskController {
  shareTask = applicationController(
    async (req: Request<SharedTask>, res: Response) => {
      const { task: taskId, account: accountId } = req.body;

      const sharedTask = await SharedTaskService.shareTask({
        task: taskId,
        account: accountId,
      });

      Logger.debug(`created shared task entery: ${JSON.stringify(sharedTask)}`);

      res.status(HttpStatusCodes.OK).send(sharedTask);
    },
  );

  getSharedTasks = applicationController(
    async (req: Request<{}>, res: Response<SerialiseSharedTask[]>) => {
      const page = +(req.query as PageParams).page;
      const size = +(req.query as PageParams).size;
      const params: GetAllSharedTaskParams = {
        accountId: req.accountId,
        page,
        size,
      };

      Logger.info(
        `received get shared task request for page ${page} of size ${size}`,
      );

      const SharedTasks = await SharedTaskService.getSharedTasksForAccount(
        params,
      );

      Logger.debug(`sharedTask  ${JSON.stringify(SharedTasks)}`);

      const SharedTaskJSONPromise = SharedTasks.map(async (sharedTask) =>
        SharedTaskUtils.convertSharedTaskDBToSharedTask(sharedTask),
      );

      Logger.debug(
        `sharedTaskJsonPromise  ${JSON.stringify(SharedTaskJSONPromise)}`,
      );

      const SharedTaskJson = await Promise.all(SharedTaskJSONPromise);

      //shared account details not needed as it will always be task shared to self
      const SharedTaskWithoutAccount = SharedTaskJson.map(
        (sharedTask) => sharedTask.task,
      );

      Logger.debug(`sharedTaskJson  ${JSON.stringify(SharedTaskJson)}`);

      res.status(HttpStatusCodes.OK).send(SharedTaskWithoutAccount);
    },
  );
}
