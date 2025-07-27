'use client'

import {Dashboard} from "@/components/pages/dashboard"
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const {isLoaded , isSignedIn , user } = useUser()
  const {getToken} = useAuth()
  const [ token , setToken ] = useState<any>(null)
  
  useEffect(()=>{
    
    if(!isSignedIn){
        return
    }
    
    const fetchUser = async () => {
      const token = await getToken()
      const res = await fetch("http://localhost:3000/api/user/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data)
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
