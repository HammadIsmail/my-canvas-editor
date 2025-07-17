import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@/lib/Model/user'
import { connectToDatabase } from '@/lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req) {
  await connectToDatabase()
  const { email, password } = await req.json()

  try {
    const user = await User.findOne({ email })
    if (!user) return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return Response.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    return Response.json({ message: 'Login successful', token })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
