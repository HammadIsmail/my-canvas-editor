// app/api/designs/route.js
import { NextResponse } from 'next/server';
import Design from '@/lib/Model/design';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId'); // For getting user's designs
    const publicOnly = searchParams.get('public') === 'true';
    
    let query = {};
    
    if (publicOnly) {
      query.isPublic = true;
    }
    
    if (userId) {
      query['author.id'] = userId;
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const [designs, total] = await Promise.all([
      Design.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-canvasData'), // Exclude canvas data for list view
      Design.countDocuments(query)
    ]);
    
    return NextResponse.json({
      designs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching designs:', error);
    return NextResponse.json({ error: 'Failed to fetch designs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const {
      title,
      description,
      thumbnail,
      canvasData,
      canvasSize,
      backgroundColor,
     
      isPublic,
      category,
      tags,
      author
    } = body;
    
    // Validate required fields
    if (!title || !thumbnail || !canvasData || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const design = new Design({
      title,
      description,
      thumbnail,
      canvasData,
      canvasSize,
      backgroundColor,
     
      isPublic,
      category,
      tags: tags || [],
      author
    });
    
    await design.save();
    
    return NextResponse.json({ 
      message: 'Design saved successfully',
      design: {
        _id: design._id,
        title: design.title,
        thumbnail: design.thumbnail,
        isPublic: design.isPublic
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving design:', error);
    return NextResponse.json({ error: 'Failed to save design' }, { status: 500 });
  }
}
