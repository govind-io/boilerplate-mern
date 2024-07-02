import { ApplicationServer } from '../../application';

import CommentsRouter from './comments-router';

export default class CommentsServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new CommentsRouter();

    server.use('/comments', router.router);
  }
}
