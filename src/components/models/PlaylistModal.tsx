'use client'

import {
  useForm,
  SubmitHandler,
} from 'react-hook-form'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useEffect, useState } from 'react'
import { GripVertical, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { addPlaylist} from '@/app/apis/playlist'
import { addPlaylistData } from '@/lib/redux/slice/playlistSlice'
import { useAuth } from '@clerk/nextjs'
import { useDispatch } from 'react-redux'
import { User } from '@clerk/nextjs/server'

export type Media = {
  id: number
  name: string
  type: 'VIDEO' | 'IMAGE' | 'AUDIO' | 'DOCUMENT' | 'HTML'
  url?: string
}

export interface Playlist {
  id?: string
  name: string
  description: string
  createdById?: string
  createdAt?: string
  updatedAt?: string
  createdBy?: User
  items?: PlaylistItem[]
  screenLinks?: PlaylistOnScreen[]
}

export interface PlaylistItem {
  id?: string
  playlistId: string
  mediaId: string
  position: number
  durationOverride: number
  transitionEffect: string
}

export interface PlaylistOnScreen {
  id?: string
  playlistId: string
  screenId: string
  position: number
  durationOverride: number
  transitionEffect: string
}

type FormValues = {
  name: string
  description: string
  items: PlaylistItem[]
}

type PlaylistModalProps = {
  isEdit?: boolean
  defaultValues?: Partial<Playlist> 
  mediaList?: Media[]
}

export function PlaylistModal({
  isEdit = false,
  defaultValues,
  mediaList,
}: PlaylistModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>(defaultValues?.items?.map((item) => Number(item)) ?? [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const [token, setToken] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      items: defaultValues?.items ?? [],
    },
  })

  const sensors = useSensors(useSensor(PointerSensor))

  const toggleMedia = (id: number) => {
    setSelectedMediaIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken()
      setToken(token)
    }
    fetchToken()
  }, [getToken])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (selectedMediaIds.length === 0) {
      toast.error('Please select at least one media item')
      return
    }

    setIsSubmitting(true)

    try {
      const payload: Playlist = {
        name: data.name.trim(),
        description: data.description.trim(),
        items: data.items,
        ...(isEdit && defaultValues?.id && { id: defaultValues.id }),
      }

     
      await addPlaylist(payload, token)
      dispatch(addPlaylistData(payload as any))
      // setOpen(false)
      // reset()
      toast.success(`Playlist ${isEdit ? 'updated' : 'created'} successfully`)
    } catch (error) {
      console.error('Error saving playlist:', error)
      toast.error('Failed to save playlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = selectedMediaIds.indexOf(active.id)
      const newIndex = selectedMediaIds.indexOf(over.id)
      setSelectedMediaIds(arrayMove(selectedMediaIds, oldIndex, newIndex))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Plus size={16} />
          {isEdit ? 'Edit Playlist' : 'Add Playlist'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[calc(100vh-160px)] overflow-y-auto mb-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Playlist' : 'Create Playlist'}</DialogTitle>
            <DialogDescription>
              {isEdit ? 'Update playlist info and media.' : 'Create a new playlist and select media.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter playlist name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register('description')}
                placeholder="Enter playlist description"
              />
            </div>

            <div className="grid gap-2">
              <Label>Select Media *</Label>
              <Command>
                <CommandInput placeholder="Search media..." />
                <CommandEmpty>No media found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-40 rounded-md border p-1  dark:bg-zinc-900">
                    {mediaList?.map((media) => (
                      <CommandItem
                        key={media.id}
                        onSelect={() => toggleMedia(media.id)}
                        className={clsx(
                          'cursor-pointer px-2 py-2 rounded-md flex items-center gap-3',
                          selectedMediaIds.includes(media.id)
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                            : ''
                        )}
                      >
                        {media.url && (media.type === 'VIDEO' || media.type === 'IMAGE') ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-10 h-10 object-cover rounded-md border"
                          />
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs uppercase">
                            {media.type.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col text-left">
                          <span className="font-medium truncate">{media.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">{media.type}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </div>

            {selectedMediaIds.length > 0 && (
              <div className="grid gap-2">
                <Label>Reorder Selected Media</Label>
                <ScrollArea className="h-40 border rounded-md p-2 bg-muted">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={selectedMediaIds}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="flex flex-col gap-2">
                        {selectedMediaIds.map((id) => {
                          const media = mediaList?.find((m) => m.id === id)
                          return media ? (
                            <SortableItem key={id} media={media} />
                          ) : null
                        })}
                      </div>
                    </SortableContext>
                  </DndContext>
                </ScrollArea>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                reset()
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || selectedMediaIds.length === 0}
            >
              {isSubmitting
                ? isEdit
                  ? 'Saving...'
                  : 'Creating...'
                : isEdit
                ? 'Save Changes'
                : 'Create Playlist'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Sortable Item
function SortableItem({ media }: { media: Media }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: media.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-background p-2 rounded-md border flex items-center gap-3"
    >
      <div {...listeners} className="cursor-grab text-gray-400">
        <GripVertical size={18} />
      </div>
      <div className="flex-1 truncate text-sm">
        <div className='flex items-center gap-2'>
        <span className="font-medium">{media.name}</span>{' '}
        <img src={media.url} alt={media.name} className="w-10 h-10 object-cover rounded-md border" /> 
        </div>
        <span className="text-xs text-muted-foreground capitalize">({media.type})</span>
      </div>
    </div>
  )
}
