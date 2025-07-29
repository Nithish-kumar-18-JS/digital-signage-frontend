import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/lib/redux/slice/userSlice'
import mediaReducer from '@/lib/redux/slice/mediaSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    media: mediaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
