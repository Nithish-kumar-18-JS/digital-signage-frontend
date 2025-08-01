'use client'

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle"

export default function Header() {
  return (
    <header className="flex w-full justify-end items-center p-4 gap-4 h-16 border border-b-2 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:shadow-sm">
      <SignedOut>
        <div className="w-full flex justify-between items-center">
          <h1>Logo</h1>
          <div className="flex gap-2 justify-end items-center w-full">
            <SignInButton />
            <SignUpButton>
              <button className="text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
            <DarkModeToggle />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-full flex justify-between items-center">
          <h1>Logo</h1>
          <div className="flex gap-2">
            <DarkModeToggle />
            <UserButton />
          </div>
        </div>
      </SignedIn>
    </header>
  )
}