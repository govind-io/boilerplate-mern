import { ApplicationRepository } from '../../../application';

import { CommentsDb, CommentsDbSchema } from './comments-db';

const CommentsRepository = ApplicationRepository<CommentsDb>(
  'Comments',
  CommentsDbSchema,
);

export default CommentsRepository;
