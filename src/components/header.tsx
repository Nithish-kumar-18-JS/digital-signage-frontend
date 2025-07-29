'use client'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
export default function Header() {
    return (<header className="flex w-full bg-white justify-end items-center p-4 gap-4 h-16 border border-b-2 border-gray-200 shadow-sm">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className='w-full flex justify-between items-center'>
            <h1>Logo</h1>
            <UserButton />
          </div>
        </SignedIn>
      </header>)
}