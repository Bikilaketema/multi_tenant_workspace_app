"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export function JoinOrganizationForm({ className, ...props }: React.ComponentProps<"form">) {
  const [inviteCode, setInviteCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { joinOrganization } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await joinOrganization(inviteCode)
      router.push("/dashboard/table")
    } catch (error) {
      console.error("Join organization failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Join an organization</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your invite code to join an existing organization
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="invite-code">Invite Code</Label>
          <Input
            id="invite-code"
            type="text"
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Joining..." : "Join Organization"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Want to create your own?{" "}
        <Link href="/create-organization" className="underline underline-offset-4">
          Create an organization
        </Link>
      </div>
    </form>
  )
}
