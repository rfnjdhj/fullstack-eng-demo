import { ITodo } from './../types/todo';
import { model, Schema } from 'mongoose';

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

todoSchema.index({ createdAt: -1 });
todoSchema.index({ updatedAt: -1 });

export default model<ITodo>('Todo', todoSchema);
