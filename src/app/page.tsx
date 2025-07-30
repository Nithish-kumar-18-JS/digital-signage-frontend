'use client'

import {Dashboard} from "@/components/pages/dashboard"
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { storeUser } from '@/lib/redux/slice/userSlice'
export default function Home() {
  const {isLoaded , isSignedIn , user } = useUser()
  const {getToken} = useAuth()
  const dispatch = useDispatch()  
  useEffect(()=>{
    
    if(!isSignedIn){
        return
    }
    
    const fetchUser = async () => {
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/me`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      dispatch(storeUser(data))
    }

    fetchUser()

  },[isSignedIn])
  
  if(!isLoaded){
    return <div>Loading...</div>
  }

  if(!isSignedIn){
    return <div>Please sign in to continue</div>
  }

  return (
    <Dashboard />
  );
}
