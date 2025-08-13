"use client";
import MultiProviderAuth from "@/components/youtube/MultiProviderAuth";
import YouTubeUploadTest from "@/components/youtube/YoutubeTest";


export default function Youtube() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="space-y-8">
        <MultiProviderAuth />
        <div className="border-t pt-8">
          <YouTubeUploadTest />
        </div>
      </div>
    </main>
  )
}