import { ITodo } from './../types/todo';
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
        // 为 name 字段添加索引以优化搜索查询
        // index: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
        // 为 status 字段添加索引以优化状态筛选
        // index: true
    }

}, { timestamps: true })

// 为 createdAt 字段添加索引以优化按创建时间排序
// todoSchema.index({ createdAt: -1 })


export default model<ITodo>('Todo', todoSchema)