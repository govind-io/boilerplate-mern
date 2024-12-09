import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { SharedTaskController } from './shared-task-controller';

export default class SharedTaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new SharedTaskController();

    router.use(accessAuthMiddleware);

    router.get('/', ctrl.getSharedTasks);
    router.post('/', ctrl.shareTask);
  }
}
