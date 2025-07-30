import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MediaItem {
    id: string
    name: string
    type: string
    url: string
    durationSeconds: number
    uploadedById: string
    createdAt: string
    updatedAt: string
  }
  
const initialState: MediaItem[] = []

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
      setMediaList: (state, action: PayloadAction<MediaItem[]>) => {
        return action.payload // sets all media
      },
      addMediaData: (state, action: PayloadAction<MediaItem>) => {
        state.push(action.payload) // adds one item to the list
      },
      deleteMediaData: (state, action: PayloadAction<string>) => {
        state = state.filter((item) => item.id !== action.payload)
      },
      editMediaData: (state, action: PayloadAction<MediaItem>) => {
        state = state.map((item) => item.id === action.payload.id ? action.payload : item)
      }
    },
  })

export const { setMediaList, addMediaData, deleteMediaData, editMediaData } = mediaSlice.actions
export default mediaSlice.reducer
