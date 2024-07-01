import SharedTaskUtils from '../rest-api/shared-task-utils';
import { SerialiseSharedTask, SharedTask } from '../types';
import SharedTaskRepository from './store/shared-task-repository';

export default class SharedTaskWriter {
  public static async createSharedTask(
    params: SharedTask,
  ): Promise<SerialiseSharedTask> {
    const createdTask = await SharedTaskRepository.create(params);

    return SharedTaskUtils.convertSharedTaskDBToSharedTask(createdTask);
  }
}
