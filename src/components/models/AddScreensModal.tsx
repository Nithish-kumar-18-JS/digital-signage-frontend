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
import { addScreen, editScreen } from "@/app/apis/screen"
import { useDispatch } from "react-redux"
import { addMediaData, editMediaData } from "@/lib/redux/slice/mediaSlice"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"

interface FormValues {
  name: string
  location?: string
  status?: string
  lastSeen?: string
  resolution?: string
  orientation?: string
  playlistLinks?: string
  settings?: string
}

interface AddScreensModalProps {
  children: React.ReactNode
  title: string
  description?: string
  data?: any
  className?: string
  type: string
  fetchMedia?: () => void
}

export function AddScreensModal({
  children,
  title,
  description,
  data,
  className,
  type,
  fetchMedia,
}: AddScreensModalProps) {
  const { getToken } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (data) {
      setValue("name", data.name || "")
      setValue("location", data.location || "")
      setValue("status", data.status || "")
      setValue("lastSeen", data.lastSeen ? data.lastSeen.slice(0, 10) : "")
      setValue("resolution", data.resolution || "")
      setValue("orientation", data.orientation || "")
    }
  }, [data, setValue])

  const onSubmit = async (formData: FormValues) => {
    const token = await getToken()

    try {
      setLoading(true)

      if (data) {
        const result = await editScreen(token!, data.id, formData) // Empty URL
        dispatch(editMediaData(result))
        toast.success(`${title} edited successfully`)
      } else {
        const result = await addScreen(token!, formData) // Empty URL
        dispatch(addMediaData(result))
        toast.success(`${title} added successfully`)
      }

      reset()
      setOpen(false)
      fetchMedia?.()
    } catch (err) {
      console.error("Error:", err)
      toast.error(`${title} ${data ? "edit" : "upload"} failed`)
    } finally {
      setLoading(false)
    }
  }

  const formElements = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "location", label: "Location", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["ONLINE", "OFFLINE"],
      required: true,
    },
    { name: "lastSeen", label: "Last Seen", type: "date" },
    { name: "resolution", label: "Resolution", type: "text" },
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["LANDSCAPE", "PORTRAIT"],
      required: true,
    },
    { }
  ]

  const closeModal = () => {
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-blue-500 dark:bg-blue-600 dark:text-white px-2 py-3 rounded hover:bg-blue-600",
            className
          )}
          variant="default"
          onClick={() => setOpen(true)}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {formElements.map((el) => (
              <div key={el.name} className="grid gap-2">
                <Label htmlFor={el.name}>{el.label}</Label>
                {el.type === "select" ? (
                  <select
                    id={el.name}
                    {...register(el.name as keyof FormValues, { required: el.required })}
                    className="border rounded p-2"
                  >
                    <option value="">Select {el.label}</option>
                    {el.options?.map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={el.type}
                    id={el.name}
                    {...register(el.name as keyof FormValues, { required: el.required })}
                  />
                )}
                {errors[el.name as keyof FormValues] && (
                  <p className="text-sm text-red-500">This field is required</p>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={closeModal} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Processing..." : data ? "Edit" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
