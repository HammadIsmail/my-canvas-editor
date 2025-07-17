'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log('Forgot Password Email:', data)

    // TODO: Replace with your actual API call
    toast.success('Reset link sent to your email.')
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
      {/* Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
        <Image
          src="/forgot-password.svg"
          alt="Forgot Password Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/30 dark:bg-zinc-900/30 dark:border-zinc-700/50">
          <h1 className="text-3xl font-bold text-white text-center">Reset Password</h1>
          <p className="text-white text-sm text-center">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-sm text-red-200 mt-1">{errors.email.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:from-purple-700 hover:to-blue-600 transition-colors"
            >
              Send Reset Link
            </Button>
          </form>

          <p className="text-sm text-center text-white">
            Back to{' '}
            <Link href="/auth/login" className="underline hover:text-purple-200">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
