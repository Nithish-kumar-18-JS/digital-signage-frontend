'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import mediaApi from "@/app/apis/media"
import { useDispatch } from "react-redux"
import { addMediaData, editMediaData } from "@/lib/redux/slice/mediaSlice"
import { Trash, XIcon } from "lucide-react"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

export function AddMediaModal({
  children,
  title,
  description,
  data,
  className,
  type,
  fetchMedia,
}: {
  children: React.ReactNode
  title: string
  description?: string
  data?: any
  className?: string
  type: string
  fetchMedia?: () => void
}) {
  interface FormValues {
    name: string
    file: FileList
  }

  const { getToken } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm<FormValues>()

  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const {addMedia,uploadMedia,editMedia } = mediaApi()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  const form = useForm<FormValues>()
  const editMediaSubmit = async (fromData: FormValues) => {
    const token = await getToken()
    const file = fromData.file[0] // ✅ extract the first file

    if (!file) {
      console.error("No file selected")
      return
    }
    if (!data) {
      console.error("No data selected")
      return
    }

    try {
      setLoading(true)
      const result = await editMedia(fromData.name, previewUrl!,type!,token,data.id)
      dispatch(editMediaData(result))
      reset()
      toast.success(`${title} edited successfully`)
      setOpen(false)
      fetchMedia?.()
    } catch (err) {
      console.error("Upload error:", err)
      toast.error(`${title} edit failed`)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (fromData: FormValues) => {
    const token = await getToken()
    const file = fromData.file[0] // ✅ extract the first file

    if (!file) {
      console.error("No file selected")
      return
    }
    if (data) {
      editMediaSubmit(fromData)
      return
    }
    try {
      setLoading(true)
      const result = await addMedia(fromData.name, previewUrl!,type!,token)
      dispatch(addMediaData(result))
      reset()
      toast.success(`${title} added successfully`)
      setOpen(false)
      fetchMedia?.()
    } catch (err) {
      console.error("Upload error:", err)
      toast.error(`${title} upload failed`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      reset({
        name: data.name ?? "",
        file: data.url, // file inputs must be set manually by user
      })
      setPreviewUrl(data.url)
    }
  }, [data, reset])
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const token = await getToken()
      const result = await uploadMedia(token!, file)
      const imageUrl = result.url
      setPreviewUrl(imageUrl)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("bg-blue-500 text-white px-2 py-3 z-10 rounded hover:bg-blue-600",className)}
          variant="default"
          onClick={() => setOpen(true)}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            {!previewUrl && (
            <div className="grid gap-3">
              <Label htmlFor="file">File</Label>
              <Input
                type="file"
                id="file"
                accept="image/*"
                {...register("file", {
                  validate: (fileList) =>
                    fileList.length > 0 || "Please select a file",
                  onChange: (e) => {
                    if (handleImageChange) {
                      handleImageChange(e);
                    }
                  }
                })}
              />
              {errors.file && (
                <p className="text-sm text-red-500">{errors.file.message}</p>
              )}
            </div>
            )}
            {previewUrl && (
              <div className="grid gap-3">
                <Label htmlFor="file"></Label>
                <div className="flex justify-end">
                <Trash className="w-6 h-6 cursor-pointer hover:text-red-500" onClick={() => setPreviewUrl(null)} />
                </div>
                <img src={previewUrl} alt="Preview" className="w-full max-h-60 object-contain" />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => reset()} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : `${data ? "Edit" : "Add "}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
