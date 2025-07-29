"use client"
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { AddMediaModal } from "@/components/models/AddMediaModal"
export type ImageLibrary = {
    id: string
    preview: string
    name: string
    url: string
    type: string
}

const getImagePreview = (type: string,url:string,name:string) => {
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

export const columns: ColumnDef<ImageLibrary>[] = [
    {
        accessorKey: "id",
        header: "ID", 
        cell: ({ row }) => row.original.id,
        
    },
    {
        accessorKey: "preview",
        header: "Preview",
        cell: ({ row }) => (
            getImagePreview(row.original.type,row.original.url,row.original.name)
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
                <p className="text-sm text-truncate overflow-hidden max-w-[200px]">{row.original.url}</p>
            </div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <AddMediaModal title={`Edit ${row.original.type}`} description={`Edit the ${row.original.type}`} data={row.original}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                    </button>
                </AddMediaModal>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                </button>
            </div>
        ),
    },
]