import { ApplicationServer } from '../../application';
import { SharedTaskServer } from '../../shared-tasks';

import TaskRouter from './task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();
    const sharedTaskServer=new SharedTaskServer()

    server.use("/tasks", sharedTaskServer.server)
    server.use('/tasks', router.router);
  }
}
