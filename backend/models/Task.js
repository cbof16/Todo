const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide the name'],
    trim: true,
    maxlength: [20, 'name cannot be more than 20 characters'],
  },
  dueDate: {
    type: Date,
    required: [true, 'must provide the due date'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
