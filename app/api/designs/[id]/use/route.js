// app/api/designs/[id]/use/route.js
import { NextResponse } from 'next/server';
import Design from '@/lib/Model/design';
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';


export async function POST(request, context) {
  const { id } = await context.params;

  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const result = await Design.findByIdAndUpdate(
    id,
    { $inc: { 'usage.downloads': 1 } },
    { new: true }
  );

  if (!result) {
    return NextResponse.json({ error: 'Design not found' }, { status: 404 });
  }

  return NextResponse.json({
    message: 'Usage recorded',
    newCount: result.usage.downloads,
  });
}

