// models/Design.js
import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  thumbnail: {
    type: String, // URL to thumbnail image
    required: true
  },
  canvasData: {
    type: String, // JSON string of fabric.js canvas data
    required: true
  },
  canvasSize: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    preset: { type: String, required: true }
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  backgroundImage: {
    type: String // URL to background image
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['social-media', 'marketing', 'presentation', 'print', 'web', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true } // User ID
  },
  usage: {
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  likedBy: [{
    type: String // User IDs who liked this design
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better performance
designSchema.index({ isPublic: 1, createdAt: -1 });
designSchema.index({ category: 1, isPublic: 1 });
designSchema.index({ tags: 1, isPublic: 1 });
designSchema.index({ 'author.id': 1 });

export default mongoose.models.Design || mongoose.model('Design', designSchema);