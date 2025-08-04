import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
}

interface PlaylistItem {
    id: string
    playlistId: string
    mediaId: string
    position: number
    durationOverride: number
    transitionEffect: string
}

interface PlaylistOnScreen {
    id: string
    playlistId: string
    screenId: string
    position: number
    durationOverride: number
    transitionEffect: string
}

interface Playlist {
    id: string
    name: string
    description: string
    createdById: string
    createdAt: string
    updatedAt: string
    createdBy: User
    items: PlaylistItem[]
    screenLinks: PlaylistOnScreen[]
  }
  
const initialState: Playlist[] = []

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
      setPlaylistList: (state, action: PayloadAction<Playlist[]>) => {
        return action.payload // sets all playlist
      },
      addPlaylistData: (state, action: PayloadAction<Playlist>) => {
        state.push(action.payload) // adds one playlist to the list
      },
      deletePlaylistData: (state, action: PayloadAction<string>) => {
        state = state.filter((item) => item.id !== action.payload)
      },
      editPlaylistData: (state, action: PayloadAction<Playlist>) => {
        state = state.map((item) => item.id === action.payload.id ? action.payload : item)
      }
    },
  })

export const { setPlaylistList, addPlaylistData, deletePlaylistData, editPlaylistData } = playlistSlice.actions
export default playlistSlice.reducer
