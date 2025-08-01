'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Monitor, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Screen {
  id: number
  name: string
  status: "ONLINE" | "OFFLINE"
}

export default function Screens() {
  const [screens, setScreens] = useState<Screen[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingScreen, setEditingScreen] = useState<Screen | null>(null)
  const [screenName, setScreenName] = useState("")

  const handleSave = () => {
    if (editingScreen) {
      setScreens(screens.map(screen => screen.id === editingScreen.id ? { ...screen, name: screenName } : screen))
    } else {
      const newScreen: Screen = {
        id: Date.now(),
        name: screenName,
        status: "OFFLINE"
      }
      setScreens([...screens, newScreen])
    }
    setIsDialogOpen(false)
    setEditingScreen(null)
    setScreenName("")
  }

  const handleEdit = (screen: Screen) => {
    setEditingScreen(screen)
    setScreenName(screen.name)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setScreens(screens.filter(screen => screen.id !== id))
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Screens</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add Screen
        </Button>
      </div>

      {screens.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-muted-foreground">
          No screens available. Click “Add Screen” to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {screens.map(screen => (
            <div
              key={screen.id}
              className="border rounded-lg p-4 shadow-sm flex flex-col gap-2 "
            >
              <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 text-blue-500" />
                <div className="flex-1">
                  <p className="font-semibold">{screen.name}</p>
                  <p className={`text-sm ${screen.status === "ONLINE" ? "text-green-500" : "text-red-500"}`}>
                    {screen.status}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(screen)}>
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(screen.id)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingScreen ? "Edit Screen" : "Add Screen"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name">Screen Name</Label>
            <Input
              id="name"
              value={screenName}
              onChange={e => setScreenName(e.target.value)}
              placeholder="e.g. Lobby Display"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave}>{editingScreen ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
