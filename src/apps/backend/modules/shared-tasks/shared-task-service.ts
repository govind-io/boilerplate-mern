import { AccountService } from '../account';
import { Logger } from '../logger';
import { TaskService } from '../task';
import SharedTaskWriter from './internal/shared-task-writer';
import SharedTaskRepository from './internal/store/shared-task-repository';
import {
  SerialiseSharedTask,
  SharedTask,
  SharedTaskAccountNotFound,
  TaskAlreadSharedError,
} from './types';

export default class SharedTaskService {
  public static async shareTask(
    params: SharedTask,
  ): Promise<SerialiseSharedTask> {
    const { task: taskId, account: accountId } = params;

    Logger.info(`Share task ${taskId} with ${accountId} requested`);

    //no need to validate if task does not exist, as an error is thrown from task service
    const task = await TaskService.getTaskById({ taskId });

    Logger.info(`Found task to be shared:  ${JSON.stringify(task)}`);

    const account = await AccountService.getAccountById({ accountId });

    if (!account) {
      Logger.info(`Can not find Account, task to be shared with: ${accountId}`);
      throw new SharedTaskAccountNotFound(accountId);
    }

    Logger.info(
      `Found Account, task to be shared with:  ${JSON.stringify(account)}`,
    );

    const isExisting = await SharedTaskRepository.find({
      account: accountId,
      task: taskId,
    });

    if(isExisting.length>0){
      throw new TaskAlreadSharedError(taskId,accountId)
    }

    return await SharedTaskWriter.createSharedTask(params);
  }
}
