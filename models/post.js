
// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the Post schema
const PostSchema = new Schema({
  topic: { type: String, required: false },    
  title: { type: String, required: true },
  body: { type: String, required: true },
  userName: { type: String, required: true },
  tags: { type: [""] },
  createdAt: { type: Date, default: Date.now },    
});

// Sets the createdAt parameter equal to the current time
PostSchema.pre('save', (next) => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

// Exports the PostSchema for use elsewhere.
module.exports = mongoose.model('Post', PostSchema);