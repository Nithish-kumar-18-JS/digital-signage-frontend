'use client'

import Link from 'next/link'
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-muted-foreground fixed bottom-0">
      <div className="max-w-[50%] mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Digital Signage. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/support" className="hover:underline">Support</Link>
        </div>
      </div>
    </footer>
  )
}
