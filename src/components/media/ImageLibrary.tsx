'use client'

import { Copy, Edit, GalleryThumbnails, Table2, Trash2 } from "lucide-react"
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

interface ImageLibraryProps {
  type: string;
}

export default function ImageLibrary({ type }: ImageLibraryProps) {
  console.log("type:", type)
  
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
    const { getAllMedia , deleteMedia } = mediaApi()
    const { getToken } = useAuth()
    const dispatch = useDispatch()
    const [token,setToken] = useState<string | null>(null)
    const [view, setView] = useState("table")
  
  
    const handleView = (type: string) => {
      if(type === "table") {
        setView("table")
      }
      else {
        setView("gallery")
      }
    }
  
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
      const data = await getAllMedia(token, type)
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
            <AddMediaModal type={row.original.type} title={`Edit ${row.original.type}`} data={row.original} fetchMedia={fetchMedia}>
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
  
    const {handleSearch} = useDebouncedSearch(token!, type);
  
    return (
      <div className="p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold capitalize">{type} Library</h1>
        </header>
        {mediaList.length > 0 && (
          <>
            <div className="flex items-center gap-2 mt-4">
              <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder={`Search ${type}`} className="w-[80%] p-2 border border-gray-300 rounded dark:border-gray-600" />
              <button className="bg-blue-500 dark:bg-blue-600 dark:text-white px-2 py-2 rounded">Search</button>
              <AddMediaModal type={type} title={`Add ${type}`} fetchMedia={fetchMedia}>
                Add {type}
              </AddMediaModal>
              <div className="flex items-center gap-2">
              <Table2 className="w-6 h-6" onClick={() => handleView("table")}/>
              <GalleryThumbnails className="w-6 h-6" onClick={() => handleView("gallery")}/>
            </div>
            </div>
            {view === "table" ? <div className="overflow-x-auto mt-10">
              <DataTable columns={columns} data={mediaList} />
            </div>
            :
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
              {mediaList.map((item: any) => (
                <div
                key={item.id}
                className="rounded-2xl shadow-sm  p-6 hover:shadow-lg transition-shadow duration-300 relative mb-16"
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  <AddMediaModal type={item.type} fetchMedia={fetchMedia} title={`Edit ${item.type}`} data={item}>
                    <Edit/>
                  </AddMediaModal>
                  <button className="text-gray-500 hover:text-red-600">
                    <Trash2 onClick={(e) => handleDeletMedia(item.id,e)} size={18} />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.name}</h2>
          {
            item.type === "IMAGE" ? (
              <img src={item.url} alt={item.name} className="w-full h-[150px] object-cover" />
            ) : (
              <video src={item.url} className="w-full h-[150px] object-cover" />
            )
          }
          {
            item.type === "AUDIO" ? (
              <audio src={item.url} className="w-full h-[150px] object-cover" />
            ) : null
          }
          {
            item.type === "DOCUMENT" ? (
              <iframe src={item.url} className="w-full h-[150px] object-cover" />
            ) : null
          }
          {
            item.type === "WEB_CONTENT" ? (
              <iframe src={item.url} className="w-full h-[150px] object-cover" />
            ) : null
          }
              </div>
            ))}
            </div> 
            }
          </>
        )}
        {mediaList.length === 0 && 
        <MediaLibraryEmpty type={type}/>
        }
      </div>
    )
  }