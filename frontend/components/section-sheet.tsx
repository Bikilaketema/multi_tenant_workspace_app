"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Outline, SectionType, Status } from "@/lib/types/types"

interface SectionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  section?: Outline | null
  mode: "add" | "edit"
  onSave: (section: Omit<Outline, "id"> & { id?: string }) => void
  onDelete?: () => void
}

export function SectionSheet({ open, onOpenChange, section, mode, onSave, onDelete }: SectionSheetProps) {
  const [header, setHeader] = useState("")
  const [sectionType, setSectionType] = useState("Narrative")
  const [status, setStatus] = useState("InProgress")
  const [target, setTarget] = useState(0)
  const [limit, setLimit] = useState(0)
  const [reviewer, setReviewer] = useState("None")

  useEffect(() => {
    if (section && mode === "edit") {
      setHeader(section.header)
      setSectionType(section.sectionType)
      setStatus(section.status)
      setTarget(section.target)
      setLimit(section.limit)
      setReviewer(section.reviewer || "None")
    } else if (mode === "add") {
      setHeader("")
      setSectionType("Narrative")
      setStatus("InProgress")
      setTarget(0)
      setLimit(0)
      setReviewer("None")
    }
  }, [section, mode, open])

  const handleSave = () => {
    onSave({
      id: section?.id,
      header,
      sectionType,
      status,
      target,
      limit,
      reviewer,
    })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{mode === "add" ? "Add Section" : "Edit Section"}</SheetTitle>
          <SheetDescription>
            {mode === "add" ? "Create a new section for your document." : "Make changes to this section."}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="header">Header</Label>
            <Input
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              placeholder="Enter section header"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sectionType">Section Type</Label>
            <Select value={sectionType} onValueChange={(v) => setSectionType(v as SectionType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TableOfContents">Table of Contents</SelectItem>
                <SelectItem value="ExecutiveSummary">Executive Summary</SelectItem>
                <SelectItem value="TechnicalApproach">Technical Approach</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Capabilities">Capabilities</SelectItem>
                <SelectItem value="FocusDocument">Focus Document</SelectItem>
                <SelectItem value="Narrative">Narrative</SelectItem>
              </SelectContent>

            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="InProgress">InProgress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="target">Target</Label>
              <Input id="target" type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="limit">Limit</Label>
              <Input id="limit" type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reviewer">Reviewer</Label>
            <Select value={reviewer} onValueChange={setReviewer}>
              <SelectTrigger>
                <SelectValue placeholder="Assign reviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">Assign reviewer...</SelectItem>
                <SelectItem value="Assim">Assim</SelectItem>
                <SelectItem value="Bini">Bini</SelectItem>
                <SelectItem value="Mami">Mami</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="flex gap-2 sm:justify-between">
          {mode === "edit" && onDelete && (
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{mode === "add" ? "Add Section" : "Save Changes"}</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
