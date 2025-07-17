import bcrypt from 'bcryptjs'
import User from '@/lib/Model/user'
import { connectToDatabase } from '@/lib/mongodb';


export async function POST(req) {
  await connectToDatabase()
  const { fullName, email, password } = await req.json()

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    await user.save()

    return Response.json({ message: 'Signup successful' })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
