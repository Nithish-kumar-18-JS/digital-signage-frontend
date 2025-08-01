import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from '@/components/header'
import { ReduxProvider } from '@/app/redux-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Digital Signage',
  description: 'Digital Signage PlatformW',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>          
          {/* Fixed Header */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
          <div className='w-full fixed top-0 z-50 h-16'>
            <Header />
          </div>
          <div>
          <SidebarProvider>
            <div className="flex pt-16 w-full">
              <SignedIn>
                <AppSidebar />
              </SignedIn>
              <main className="w-full max-w-7xl mx-auto px-4 relative">
                <SignedIn>
                  {children}
                </SignedIn>
              </main>
            </div>
            <Footer/>
          </SidebarProvider> 
          </div>
          <ToastContainer/>
          </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
