'use client'
import { Image, Video, Radio, FileText, StickyNote, PlusCircle } from "lucide-react"
import Link from "next/link"
import MediaLibraryEmpty from "@/components/media/mediaLibraryEmpty"
import { AddMediaModal } from "@/components/models/AddMediaModal"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import mediaApi from "@/app/apis/media"
import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { setMediaList } from "@/lib/redux/slice/mediaSlice"
import { useDispatch } from "react-redux"

export default function MediaLibrary() {
  const mediaList:any = useSelector((state: RootState) => state.media)
  const {getAllMedia} = mediaApi()
  const {getToken} = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchMedia = async () => {
        const token = await getToken()
        const data = await getAllMedia(token, "IMAGE")
        dispatch(setMediaList(data))
    }
    fetchMedia()
}, [])
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
      {mediaList.length > 0 && (
        <>
        <div className="flex items-center gap-2 mt-4">
                <input type="text" placeholder="Search" className="w-[80%] p-2 border border-gray-300 rounded" />
                <button className="bg-blue-500 text-white px-2 py-2 rounded">Search</button>
            </div> 
            <div className="overflow-x-auto mt-10">
                <DataTable columns={columns} data={mediaList}/>
            </div>
        </>
      )}
      {mediaList.length === 0 && <MediaLibraryEmpty />}
    </div>
  )
}
