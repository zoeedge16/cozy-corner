const { Schema } = require('mongoose');

// Schema for when a user posts a comment
const commentSchema = Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true
  }
}, { timestamps: true });

module.exports = commentSchema;
