"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DocumentLibrary = {
    id: string
    preview: string
    name: string
    url: string
}

export const columns: ColumnDef<DocumentLibrary>[] = [
    {
        accessorKey: "id",
        header: "ID", 
        cell: ({ row }) => row.original.id,
        
    },
    {
        accessorKey: "preview",
        header: "Preview",
        cell: ({ row }) => (
            <img className="w-12 h-12" src={'/audio-waves.png'} alt={row.original.name} />
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
                <p className="text-sm text-truncate overflow-hidden max-w-[200px]">{row.original.url}</p>
            </div>
        ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                </button>
            </div>
        ),
    },
]