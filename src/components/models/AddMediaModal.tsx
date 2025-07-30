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
import { useEffect, useState } from "react"
import mediaApi from "@/app/apis/media"
import { useDispatch } from "react-redux"
import { addMediaData } from "@/lib/redux/slice/mediaSlice"

export function AddMediaModal({
  children,
  title,
  description,
  data,
}: {
  children: React.ReactNode
  title: string
  description?: string
  data?: any
}) {
  interface FormValues {
    name: string
    image: FileList
  }

  const { getToken } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm<FormValues>()

  const [loading, setLoading] = useState(false)
  const {addMedia } = mediaApi()
  const dispatch = useDispatch()
  const form = useForm<FormValues>()
  const onSubmit = async (data: FormValues) => {
    const token = await getToken()
    const file = data.image[0] // ✅ extract the first file

    if (!file) {
      console.error("No file selected")
      return
    }

    try {
      setLoading(true)
      const result = await addMedia(data.name, file,"IMAGE",token)
      dispatch(addMediaData(result))
      reset()
    } catch (err) {
      console.error("Upload error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        image: undefined, // file inputs must be set manually by user
      })
    }
  }, [data, reset])
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 text-white px-2 py-3 z-10 rounded hover:bg-blue-600"
          variant="default"
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
            <div className="grid gap-3">
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", {
                  validate: (fileList) =>
                    fileList.length > 0 || "Please select a file",
                })}
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => reset()} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Add Image"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
