"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusCircle, CalendarIcon, Edit2, Trash } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

type Schedule = {
  id: string
  name: string
  date: Date
}

export default function Schedules() {
  const [scheduleName, setScheduleName] = useState("")
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date())
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null)

  const handleSave = () => {
    if (editingSchedule) {
      setSchedules(prev =>
        prev.map(s =>
          s.id === editingSchedule.id
            ? { ...editingSchedule, name: scheduleName, date: scheduleDate || new Date() }
            : s
        )
      )
    } else {
      setSchedules(prev => [
        ...prev,
        { id: crypto.randomUUID(), name: scheduleName, date: scheduleDate || new Date() },
      ])
    }
    setScheduleName("")
    setScheduleDate(new Date())
    setEditingSchedule(null)
  }

  const handleDelete = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id))
  }

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule)
    setScheduleName(schedule.name)
    setScheduleDate(schedule.date)
  }

  const columns: ColumnDef<Schedule>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(row.original.date, "PPP"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => handleEdit(row.original)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => handleDelete(row.original.id)}>
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Schedules</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              {editingSchedule ? "Edit Schedule" : "Add Schedule"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingSchedule ? "Edit Schedule" : "Create Schedule"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Input
                placeholder="Schedule name"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={scheduleDate} onSelect={setScheduleDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Button onClick={handleSave}>{editingSchedule ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {schedules.length > 0 ? (
        <DataTable columns={columns} data={schedules} />
      ) : (
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-muted-foreground">
          No schedules found. Click “Add Schedule” to create one.
        </div>
      )}
    </div>
  )
}
