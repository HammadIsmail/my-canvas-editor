// app/api/images/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Image from '@/lib/Model/Image';

// GET: Fetch recent images
export async function GET() {
  try {
    await connectToDatabase();

    const images = await Image.find({})
      .sort({ uploadedAt: -1 })
      .limit(50);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// DELETE: Delete image by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('id');
    const publicId = searchParams.get('publicId');

    if (!imageId || !publicId) {
      return NextResponse.json(
        { error: 'Image ID and public ID are required' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB (via Mongoose)
    await connectToDatabase();
    await Image.findByIdAndDelete(imageId);

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
