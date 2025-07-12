// lib/Model/image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better performance
ImageSchema.index({ uploadedAt: -1 });
ImageSchema.index({ publicId: 1 });

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);