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
    },
  })

export const { setMediaList, addMediaData } = mediaSlice.actions
export default mediaSlice.reducer
