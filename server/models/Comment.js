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
  postId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = commentSchema;
