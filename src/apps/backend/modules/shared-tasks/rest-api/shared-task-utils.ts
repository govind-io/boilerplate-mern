import { AccountService } from '../../account';
import { TaskService } from '../../task';
import { SerialiseSharedTask } from '../types';

export default class SharedTaskUtils {
  public static async convertSharedTaskDBToSharedTask(sharedTaskDb: {
    task: string;
    account: string;
  }): Promise<SerialiseSharedTask> {
    const sharedTask = new SerialiseSharedTask();

    const taskAndAccountPromise = [
      TaskService.getTaskById({
        taskId: sharedTaskDb.task.toString(),
      }),
      AccountService.getAccountById({
        accountId: sharedTaskDb.account.toString(),
      }),
    ] as const;

    const taskAndAccount = await Promise.all(taskAndAccountPromise);

    sharedTask.task = taskAndAccount[0];

    const account = taskAndAccount[1];

    sharedTask.account = {
      firstName: account.firstName,
      lastName: account.lastName,
      username: account.username,
    };

    return sharedTask;
  }
}
