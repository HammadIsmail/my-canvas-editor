// lib/Model/image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: String,
  publicId: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
