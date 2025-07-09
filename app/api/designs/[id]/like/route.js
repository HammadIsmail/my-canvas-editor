
// app/api/designs/[id]/like/route.js
import { NextResponse } from 'next/server';
import Design from '@/lib/Model/design';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request, { params }) {
  try {
    await connectToDatabase();
    
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    
    const design = await Design.findById(params.id);
    
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }
    
    const hasLiked = design.likedBy.includes(userId);
    
    if (hasLiked) {
      // Unlike
      await Design.findByIdAndUpdate(params.id, {
        $pull: { likedBy: userId },
        $inc: { 'usage.likes': -1 }
      });
    } else {
      // Like
      await Design.findByIdAndUpdate(params.id, {
        $push: { likedBy: userId },
        $inc: { 'usage.likes': 1 }
      });
    }
    
    return NextResponse.json({ 
      message: hasLiked ? 'Design unliked' : 'Design liked',
      liked: !hasLiked
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}

