import { SharedTaskDb } from '../internal/store/shared-task-db';
import { SerialiseSharedTask } from '../types';

export default class SharedTaskUtils {
  public static convertSharedTaskDBToSharedTask(
    sharedTaskDb: SharedTaskDb,
  ): SerialiseSharedTask {
    const sharedTask = new SerialiseSharedTask();

    sharedTask.account = sharedTaskDb.account.toString();
    sharedTask.task = sharedTaskDb.task.toString();

    return sharedTask;
  }
}
