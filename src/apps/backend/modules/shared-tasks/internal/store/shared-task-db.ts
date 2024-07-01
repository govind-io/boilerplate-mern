import { Schema, Types } from 'mongoose';

export interface SharedTaskDb {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  task:Types.ObjectId
}

export const SharedTaskDbSchema: Schema = new Schema<SharedTaskDb>(
  {
   task:{
    type:Schema.Types.ObjectId,
    ref:"Task",
    index:true,
    required:true
   },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
  },
  {
    collection: 'shared-tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
