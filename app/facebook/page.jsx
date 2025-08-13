// app/page.js
import Test from '@/components/FacebookTest'

export default function Facebook() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Social Media Automation Tool
        </h1>
        <Test />
      </div>
    </div>
  )
}