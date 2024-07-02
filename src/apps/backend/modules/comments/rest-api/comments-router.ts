import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { CommentsController } from './comments-controller';

export default class CommentsRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new CommentsController();

    router.use(accessAuthMiddleware);

    router.get('/', ctrl.hello);
  }
}
