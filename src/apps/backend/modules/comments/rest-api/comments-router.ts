import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { CommentsController } from './comments-controller';

export default class CommentsRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new CommentsController();

    router.use(accessAuthMiddleware);

    router.post('/', ctrl.addComment);
    router.get('/', ctrl.getComments);
    router.get('/:id', ctrl.getComment);
    router.patch('/:id', ctrl.updateComment);
    router.delete('/:id', ctrl.deleteComment);
  }
}
