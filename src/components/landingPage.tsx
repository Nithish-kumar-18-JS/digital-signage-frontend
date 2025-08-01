'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, MonitorPlay, CloudUpload, Clock, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-b from-white to-gray-100 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Smarter Digital Signage</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create, schedule, and manage media content across screens in real time.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Platform Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <FeatureCard icon={<CloudUpload />} title="Media Library" desc="Upload and manage all your media in one place." />
            <FeatureCard icon={<CalendarDays />} title="Smart Scheduling" desc="Set up content schedules with ease." />
            <FeatureCard icon={<MonitorPlay />} title="Live Screens" desc="Monitor real-time screen activity." />
            <FeatureCard icon={<LayoutDashboard />} title="Playlists" desc="Organize content into custom playlists." />
            <FeatureCard icon={<Clock />} title="Timed Content" desc="Trigger media at specific times or days." />
          </div>
        </div>
      </section>

      {/* Screen Previews */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Live Screens</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Screen A", "Screen B", "Screen C"].map((screen, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-4">
                  <img src={`/preview-${i + 1}.jpg`} alt={screen} className="rounded-lg mb-3 w-full h-40 object-cover" />
                  <p className="font-semibold">{screen}</p>
                  <p className="text-sm text-green-600 mt-1">Online</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <Card className="p-5 text-left shadow-sm hover:shadow-lg transition">
    <div className="flex items-center gap-3 mb-3 text-blue-600">
      {icon}
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-sm text-gray-600">{desc}</p>
  </Card>
)
