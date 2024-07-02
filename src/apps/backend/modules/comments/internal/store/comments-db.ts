import { Schema, Types } from 'mongoose';

export interface CommentsDb {
  _id: Types.ObjectId;
  task: Types.ObjectId;
  account: Types.ObjectId;
  message: string;
}

export const CommentsDbSchema: Schema = new Schema<CommentsDb>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      index: true,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
      index: true,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'comments',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
