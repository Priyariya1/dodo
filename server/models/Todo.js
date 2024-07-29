const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      completedOn: {
        type: Date
      },
      timer: {
        startTime: Date,
        endTime: Date,
        elapsedTime: Number,
      },
})

module.exports = mongoose.model('Todo', TodoSchema)