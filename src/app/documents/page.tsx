'use client'

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AddMediaModal } from "@/components/models/AddMediaModal"
import { PlusCircle } from "lucide-react"
import mediaApi from "@/app/apis/media"
import { useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { setMediaList } from "@/lib/redux/slice/mediaSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"

export default function Documents() {
    const mediaList:any = useSelector((state: RootState) => state.media)
    const {getAllMedia} = mediaApi()
    const {getToken} = useAuth()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchMedia = async () => {
            const token = await getToken()
            const data = await getAllMedia(token, "DOCUMENT")
            dispatch(setMediaList(data))
        }
        fetchMedia()
    }, [])

    return (
        <div className="p-4">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Document Library</h1>
            </header>
            {/* search */}
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Search" className="w-[80%] p-2 border border-gray-300 rounded" />
                <button className="bg-blue-500 text-white px-2 py-2 rounded">Search</button>
                <AddMediaModal title="Add Document" description="Add a new Document to the library">
                    <PlusCircle className="w-2 h-2" />
                    Add Document
                </AddMediaModal>
            </div> 
            <div className="overflow-x-auto mt-10">
                <DataTable columns={columns} data={mediaList} />
            </div>
        </div>
    )
}
