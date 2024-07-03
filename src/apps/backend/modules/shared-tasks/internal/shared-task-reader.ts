import { GetAllSharedTaskParams, SharedTask } from '../types';
import SharedTaskRepository from './store/shared-task-repository';

export default class SharedTaskReader {
  public static async getSharedTasksForAccount(
    params: GetAllSharedTaskParams,
  ): Promise<SharedTask[]> {
    const totalTasksCount = await SharedTaskRepository.countDocuments({
      account: params.accountId,
    });
    const paginationParams = {
      page: params.page ? params.page : 1,
      size: params.size ? params.size : totalTasksCount,
    };
    const startIndex = (paginationParams.page - 1) * paginationParams.size;

    const sharedTaskDb = await SharedTaskRepository.find({
      account: params.accountId,
    })
      .limit(paginationParams.size)
      .skip(startIndex);

    return sharedTaskDb.map((sharedTask) => ({
      account: sharedTask.account.toString(),
      task: sharedTask.task.toString(),
    }));
  }
}
