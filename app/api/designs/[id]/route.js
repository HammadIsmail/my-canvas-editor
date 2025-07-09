
// app/api/designs/[id]/route.js
import { NextResponse } from 'next/server';
import Design from '@/lib/Model/design';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const design = await Design.findById(params.id);
    
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }
    
    // Increment view count
    await Design.findByIdAndUpdate(params.id, { $inc: { 'usage.views': 1 } });
    console.log(design)
    return NextResponse.json({ design });
  } catch (error) {
    console.error('Error fetching design:', error);
    return NextResponse.json({ error: 'Failed to fetch design' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { userId, ...updateData } = body;
    
    const design = await Design.findById(params.id);
    
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }
    
    // Check if user owns this design
    if (design.author.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    updateData.updatedAt = new Date();
    
    const updatedDesign = await Design.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ 
      message: 'Design updated successfully',
      design: updatedDesign
    });
  } catch (error) {
    console.error('Error updating design:', error);
    return NextResponse.json({ error: 'Failed to update design' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const design = await Design.findById(params.id);
    
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }
    
    // Check if user owns this design
    if (design.author.id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    await Design.findByIdAndDelete(params.id);
    
    return NextResponse.json({ message: 'Design deleted successfully' });
  } catch (error) {
    console.error('Error deleting design:', error);
    return NextResponse.json({ error: 'Failed to delete design' }, { status: 500 });
  }
}
