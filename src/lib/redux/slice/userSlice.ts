import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string
  name: string
  isLoggedIn: boolean
  clerkId: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
  updatedAt: string
  uploadedMedia: string[]
  createdPlaylists: string[]
}

const initialState: UserState = {
  id: '',
  name: '',
  isLoggedIn: false,
  clerkId: '',
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  createdAt: '',
  updatedAt: '',
  uploadedMedia: [],
  createdPlaylists: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state = initialState
    },
    storeUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload)
    },
  },
})

export const { login, logout, storeUser } = userSlice.actions
export default userSlice.reducer
