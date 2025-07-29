'use client'
import { Image, Video, Radio, FileText, StickyNote } from "lucide-react"
import Link from "next/link"
import MediaLibraryEmpty from "@/components/media/mediaLibraryEmpty"

export default function MediaLibrary() {
  const mediaLibrary = [
    {
      title: "Images",
      image: '/picture.png',
      url: "/images",
    },
    {
      title: "Videos",
      image: '/youtube.png',
      url: "/videos",
    },
    {
      title: "Audio",
      image: '/audio-waves.png',
      url: "/audio",
    },
    {
      title: "Documents",
      image: '/google-docs.png',
      url: "/documents",
    },
    {
      title: "Web Content",
      image: '/content-writing.png',
      url: "/webcontent",
    },
  ]

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
      </header>

      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {mediaLibrary.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="w-full h-[120px] bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-4 hover:shadow-xl hover:bg-gray-50 transition-all"
          >
            <img src={item.image} alt={item.title} className="w-12 h-12 mb-2" />
            <p className="text-sm font-normal mt-2 text-center">{item.title}</p>
          </Link>
        ))}
      </main>
      <MediaLibraryEmpty />
    </div>
  )
}
