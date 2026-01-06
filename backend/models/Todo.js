import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;