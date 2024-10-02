import { SerialiseSharedTask, SharedTask } from '../types';
import SharedTaskUtils from './shared-task-utils';

export const serializeSharedTaskAsJSON = async (
  sharedTask: SharedTask,
): Promise<SerialiseSharedTask> => {
  return await SharedTaskUtils.convertSharedTaskDBToSharedTask(sharedTask);
};
