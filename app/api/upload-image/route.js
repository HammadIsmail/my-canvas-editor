// app/api/upload-image/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { connectToDatabase } from '@/lib/mongodb';
import Image from '@/lib/Model/Image';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    console.log('Upload request received');
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary configuration missing');
      return NextResponse.json({ error: 'Cloudinary configuration missing' }, { status: 500 });
    }

    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      console.error('No file provided');
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('File received:', file.name, file.size, file.type);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Buffer created, size:', buffer.length);

    // Upload to Cloudinary
    console.log('Starting Cloudinary upload...');
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'canvas-editor',
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' },
            { quality: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload successful:', result.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    console.log('Connecting to MongoDB with Mongoose...');
    // Connect to MongoDB using Mongoose
    await connectToDatabase();

    // Create new image document using Mongoose model
    const imageData = {
      filename: file.name,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height,
      format: uploadResponse.format,
      size: uploadResponse.bytes,
      uploadedAt: new Date(),
    };

    console.log('Saving to MongoDB with Mongoose...');
    const newImage = new Image(imageData);
    const savedImage = await newImage.save();
    console.log('MongoDB save successful:', savedImage._id);

    return NextResponse.json({
      message: 'Image uploaded successfully',
      image: savedImage,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload image', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}