'use client'
import { Image, Video, Radio, FileText, StickyNote, PlusCircle, Copy } from "lucide-react"
import Link from "next/link"
import MediaLibraryEmpty from "@/components/media/mediaLibraryEmpty"
import { AddMediaModal } from "@/components/models/AddMediaModal"
import { DataTable } from "@/components/ui/data-table"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import mediaApi from "@/app/apis/media"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { deleteMediaData, setMediaList } from "@/lib/redux/slice/mediaSlice"
import { useDispatch } from "react-redux"
import { ColumnDef } from "@tanstack/react-table"
import { GlobalDialog } from "@/components/models/GlobalDialog"
import useDebouncedSearch from "@/hooks/useDebouncedSearch"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function MediaLibrary() {

  const router = useRouter()

  const getImagePreview = (type: string, url: string, name: string) => {
    switch (type) {
      case "IMAGE":
        return <img className="w-12 h-12" src={url} alt={name} />
      case "VIDEO":
        return <img className="w-12 h-12" src={'/youtube.png'} alt={name} />
      case "AUDIO":
        return <img className="w-12 h-12" src={'/audio-waves.png'} alt={name} />
      case "DOCUMENT":
        return <img className="w-12 h-12" src={'/google-docs.png'} alt={name} />
      default:
        return <img className="w-12 h-12" src={'/content-writing.png'} alt={name} />
    }
  }


  const mediaList: any = useSelector((state: RootState) => state.media)
  const { getAllMedia , searchMedia , deleteMedia } = mediaApi()
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const [token,setToken] = useState<string | null>(null)
  type ImageLibrary = {
    id: string
    preview: string
    name: string
    url: string
    type: string
  }



  const handleDeletMedia = async (id: string,event: React.FormEvent) => {
    dispatch(deleteMediaData(id))
   try {
    const token = await getToken()
    const data = await deleteMedia(id,token)
    event?.preventDefault()
    toast.success("Media deleted successfully")
   }
   catch (error) {
    console.log(error)
    toast.error("Media deleted failed")
   }

  }

  const fetchMedia = async () => {
    const token = await getToken()
    setToken(token)
    const data = await getAllMedia(token, "IMAGE")
    dispatch(setMediaList(data))
  }

  const columns: ColumnDef<ImageLibrary>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.original.id,

    },
    {
      accessorKey: "preview",
      header: "Preview",
      cell: ({ row }) => (
        getImagePreview(row.original.type, row.original.url, row.original.name)
      )
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => row.original.type,
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <p className="text-sm text-truncate overflow-hidden max-w-[250px]">{row.original.url}</p>
          <Copy className="w-5 h-5 hover:text-blue-500 cursor-pointer" onClick={() => {navigator.clipboard.writeText(row.original.url)
            toast.success("URL copied to clipboard")}} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <AddMediaModal type={row.original.type} fetchMedia={fetchMedia} title={`Edit ${row.original.type}`} data={row.original}>
            Edit
          </AddMediaModal>
          <GlobalDialog
            title={`Delete ${row.original.type}`}
            description={`Are you sure you want to delete this ${row.original.type}?`}
            action={(event) => handleDeletMedia(row.original.id,event)}
            confirmText="Delete"
            cancelText="Cancel"
          >
            Delete
          </GlobalDialog>
        </div>
      ),
    },
  ]


  useEffect(() => {
    fetchMedia()
  }, [])
  const mediaLibrary = [
    {
      title: "Images",
      image: '/picture.png',
      url: "/media/images",
    },
    {
      title: "Videos",
      image: '/youtube.png',
      url: "/media/videos",
    },
    {
      title: "Audio",
      image: '/audio-waves.png',
      url: "/media/audio",
    },
    {
      title: "Documents",
      image: '/google-docs.png',
      url: "/media/documents",
    },
    {
      title: "Web Content",
      image: '/content-writing.png',
      url: "/media/webcontent",
    },
  ]

  const {handleSearch} = useDebouncedSearch(token!);

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
          <div className="flex items-center gap-2 mt-5">
            <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder="Search" className="w-[80%] p-2 border border-gray-300 rounded" />
            <button className="bg-blue-500 text-white px-2 py-2 rounded">Search</button>
          </div>
          <div className="overflow-x-auto mt-10">
            <DataTable columns={columns} data={mediaList} />
          </div>
        </>
      )}
      {mediaList.length === 0 && <MediaLibraryEmpty type="image" />}
    </div>
  )
}
