"use client"

import * as React from "react"
import { useState } from "react"
import { Organization } from "@/lib/types/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Crown, ExternalLink, MoreHorizontal, Settings, Trash2, Users, Plus } from "lucide-react"
import { useInviteUserToOrg } from "@/hooks/useOrganizations"
import { useRouter } from "next/navigation"

export function OrganizationCard({
  organization,
  getRoleBadge,
  onDelete,
  onLeave,
}: {
  organization: Organization
  getRoleBadge: (role: string) => React.ReactNode
  onDelete: (id: string) => void
  onLeave: (id: string) => void
}) {
  const router = useRouter()
  const inviteUser = useInviteUserToOrg()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("member")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpen = () => {
    router.push(`/dashboard/${organization.id}/table`)
  }

  const handleInvite = async () => {
    setIsSubmitting(true)
    try {
      await inviteUser.mutateAsync({
        email,
        role,
        organizationId: organization.id,
        resend: true,
      })
      setDialogOpen(false)
      setEmail("")
      setRole("member")
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              {organization.logo ? (
                <AvatarImage src={organization.logo} alt={organization.name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                  {organization.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{organization.name}</h3>
                {getRoleBadge(organization.role)}
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                {organization.role === "owner" ? (
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {organization.totalMembers} members
                </span>
                ) : null}

                {/* Dialog Trigger */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    {organization.role === "owner" ? (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      Invite new member
                    </Button>
                    ) : null}
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Invite User to Organization</DialogTitle>
                      <DialogDescription>Enter the email and role for the new member.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                        />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          className="border rounded px-2 py-1"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                          <option value="owner">Owner</option>
                        </select>
                      </div>
                      <Button onClick={handleInvite} disabled={isSubmitting}>
                        {isSubmitting ? "Inviting..." : "Invite"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleOpen}>
              <ExternalLink className="h-4 w-4" />
              Open
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {organization.role === "owner" ? (
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(organization.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Organization
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onLeave(organization.id)}>
                    Leave Organization
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
