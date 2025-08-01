'use client'

import { Dashboard } from "@/components/pages/dashboard"
import LandingPage from "@/components/landingPage"
import { useAuth } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { storeUser } from "@/lib/redux/slice/userSlice"

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { getToken } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isSignedIn || !user) return

    const fetchUser = async () => {
      try {
        const token = await getToken()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        const data = await res.json()
        dispatch(storeUser(data))
      } catch (err) {
        console.error("Failed to fetch user info:", err)
      }
    }

    fetchUser()
  }, [isSignedIn, user, getToken, dispatch])

  if (!isLoaded) {
    return <div className="p-6 text-muted-foreground">Loading user info...</div>
  }

  return isSignedIn ? <Dashboard /> : <LandingPage/>
}
