const mongoose = require('mongoose');
  
const commentSchema = new mongoose.Schema({
    comment_date: {type: Date, default: Date.now},

    task_detail: {type: String, required: true},

    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    task_id: {type: mongoose.Schema.Types.ObjectID, ref: 'Task'},

    reply_user_id: {type: Array, required: false},

    reply_date: {type: Date, required: Date.now},
});

const taskSchema = new mongoose.Schema({
    taskName: {type: String, required: false},

    assignedUserIds: {type: Array, required: false},

    boardId: {type: mongoose.Schema.Types.ObjectID, ref: 'Board'},

    due_date: {type: Date, required: false},

    created_at: {type: Date, default: Date.now},

    priority: {type: Number, required: false},

    category_stage: {type: String, required: false},

    tags: {type: Array, required: false},

    task_detail: {type: String, required: false},

    comments: [commentSchema],
});

const BoardSchema = new mongoose.Schema({
    users: [{
        // pull array of users in board controller
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    boardName: {
        type: String,
        require: true,
    },

    categoryStages: {
        type: Array,
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    description: {
        type: String,
        required: true,
    },

    tasks: [taskSchema],

    createdAt: {
        type: Date, // Expected output: "Fri, 02 Feb 1996 03:04:05 GMT"
        default: Date.now,
    },
});

module.exports = {
    Board: mongoose.model('Board', BoardSchema)
}
