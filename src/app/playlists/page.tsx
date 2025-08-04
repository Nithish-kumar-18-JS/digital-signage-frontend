'use client'

import { PlaylistModal } from '@/components/models/PlaylistModal'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'
import { useAuth } from '@clerk/nextjs'
import mediaApi from '@/app/apis/media'
import { useDispatch } from 'react-redux'
import { setMediaList } from '@/lib/redux/slice/mediaSlice'
import { useEffect } from 'react'
import { getAllPlaylist } from '../apis/playlist'
import { setPlaylistList } from '@/lib/redux/slice/playlistSlice'

export default function Playlists() {
  const mediaList: any = useSelector((state: RootState) => state.media)
  const playlistList: any = useSelector((state: RootState) => state.playlist)

  const { getToken } = useAuth()

  const fetchMedia = async () => {
    const token = await getToken()
    const data = await getAllMedia(token)
    dispatch(setMediaList(data))
  }

  const fetchPlaylist = async () => {
    const token = await getToken()
    const data = await getAllPlaylist(token)
    dispatch(setPlaylistList(data))
  }

  const { getAllMedia } = mediaApi()
  const dispatch = useDispatch()

  useEffect(() => {
    fetchMedia()
    fetchPlaylist()
  }, [])

  const playlists = [
    {
      id: 1,
      title: 'Office Screens',
      description: 'Slides for the main lobby screen.',
    },
    {
      id: 2,
      title: 'Promotional Loop',
      description: 'Media loop for August promotions.',
    },
    {
      id: 3,
      title: 'Menu Screens',
      description: 'Digital menu for café screens.',
    },
  ]

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Playlists</h1>
          <PlaylistModal mediaList={mediaList}  />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {playlistList.map((playlist: any) => (
            <div
              key={playlist.id}
              className="rounded-2xl dark:bg-slate-800 dark:text-white shadow-sm  p-6 hover:shadow-lg transition-shadow duration-300 relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="text-gray-500 hover:text-blue-600">
                  <Edit size={18} />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2 dark:text-white">{playlist.name}</h2>
              <p className="text-gray-500 mb-4 dark:text-white">{playlist.description}</p>
              <button className="text-sm bg-blue-600  px-4 py-2 rounded-xl hover:bg-blue-700">
                View Playlist
              </button>
            </div>
          ))}
        </div>
        {playlistList.length === 0 && (
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-muted-foreground">
            No screens available. Click “Add Screen” to create one.
          </div>
          ) }
      </div>
    </main>
  )
}
