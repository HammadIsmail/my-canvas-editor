import User from '@/lib/Model/user'
import { connectToDatabase } from '@/lib/mongodb';
import crypto from 'crypto'

export async function POST(req) {
  await connectToDatabase()
  const { email } = await req.json()

  try {
    const user = await User.findOne({ email })
    if (!user) return Response.json({ error: 'Email not registered' }, { status: 404 })

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = Date.now() + 1000 * 60 * 15 // 15 minutes

    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}`

    // TODO: Send email with resetLink
    console.log('Reset Password Link:', resetLink)

    return Response.json({ message: 'Reset link sent to email' })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Server error' }, { status: 500 })
  }
}
