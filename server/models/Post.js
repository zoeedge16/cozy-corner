const { Schema } = require('mongoose');


// Schema to create Post model
const postSchema = new Schema(
    {
      postText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
      timestamps: true
    }
    );
  
    postSchema.virtual('formattedCreatedAt').get(function () {
        console.log('Formatting createdAt for post...');
        return this.createdAt.toISOString();  // Or your formatting logic
      });

  module.exports = postSchema; 
