import { ApplicationRepository } from '../../../application';
import { SharedTaskDb, SharedTaskDbSchema } from './shared-task-db';

const SharedTaskRepository = ApplicationRepository<SharedTaskDb>(
  'SharedTask',
  SharedTaskDbSchema,
);

export default SharedTaskRepository;
