'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/navigation"
export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const onSubmit = async (data) => {
  if (data.password !== data.confirmPassword) {
    toast.error("Passwords do not match")
    return
  }

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        password: data.password
      })
    })

    const result = await res.json()

    if (!res.ok) {
      toast.error(result.error || "Signup failed")
      return
    }

    toast.success("Account created successfully!")
     router.push('/auth/login')
  } catch (err) {
    console.error("Signup error:", err)
    toast.error("Something went wrong. Please try again.")
  }
}


  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
      {/* Illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
        <Image
          src="/signup.svg"
          alt="Signup Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Form Card */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/30 dark:bg-zinc-900/30 dark:border-zinc-700/50">
          <h1 className="text-3xl font-bold text-white text-center">Create an Account</h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Full name is required" })}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-sm text-red-200 mt-1">{errors.fullName.message}</p>}
            </div>

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

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-sm text-red-200 mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-sm text-red-200 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:from-purple-700 hover:to-blue-600 transition-colors"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-center text-white">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white underline hover:text-purple-200">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
