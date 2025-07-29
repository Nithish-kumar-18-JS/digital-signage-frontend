'use client'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function MediaLibraryEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-250px)] text-center px-4">
      <img
        src="/empty-box.png" // Optional: Your custom illustration
        alt="Empty Library"
        className="w-[80px] h-[80px] mb-6 opacity-80"
      />

      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Your Media Library is empty
      </h2>

      <p className="text-gray-600 mb-6">
        Upload or import media files to start organizing your content.
      </p>

      <Link
        href="/upload"
        className="inline-flex items-center gap-2 bg-[#fd5050] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#5939d1] transition"
      >
        <PlusCircle className="w-5 h-5" />
        Get Started — Add Image
      </Link>
    </div>
  )
}
