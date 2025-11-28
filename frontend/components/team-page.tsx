"use client"

import { useState } from "react"
import { Building2, Crown, MoreHorizontal, Shield, UserPlus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth, type UserRole } from "@/lib/auth-context"

const roleIcons = {
  owner: Crown,
  admin: Shield,
  member: Users,
}

const roleColors = {
  owner: "bg-yellow-100 text-yellow-800 border-yellow-200",
  admin: "bg-blue-100 text-blue-800 border-blue-200",
  member: "bg-gray-100 text-gray-800 border-gray-200",
}

export function TeamPage() {
  const { organization, members, currentMemberRole, inviteMember, revokeMembership, updateMemberRole } = useAuth()
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<UserRole>("member")
  const [isInviting, setIsInviting] = useState(false)

  const isOwner = currentMemberRole === "owner"

  const handleInvite = async () => {
    if (!inviteEmail) return
    setIsInviting(true)
    try {
      await inviteMember(inviteEmail, inviteRole)
      setInviteEmail("")
      setInviteRole("member")
      setInviteDialogOpen(false)
    } finally {
      setIsInviting(false)
    }
  }

  const handleRevoke = async (memberId: string) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      await revokeMembership(memberId)
    }
  }

  const handleRoleChange = async (memberId: string, newRole: UserRole) => {
    await updateMemberRole(memberId, newRole)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Info / Setup</h1>
          <p className="text-muted-foreground">Manage your organization and team members</p>
        </div>
      </div>

      {/* Organization Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle>{organization?.name || "Organization"}</CardTitle>
            <CardDescription>Plan: {organization?.plan || "Enterprise"}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8 text-sm">
            <div>
              <span className="text-muted-foreground">Total Members:</span>{" "}
              <span className="font-medium">{members.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Your Role:</span>{" "}
              <Badge variant="outline" className={roleColors[currentMemberRole || "member"]}>
                {currentMemberRole?.charAt(0).toUpperCase() + (currentMemberRole?.slice(1) || "")}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>View and manage your team members</CardDescription>
          </div>
          {isOwner && (
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>Send an invitation to join your organization.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as UserRole)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInvite} disabled={isInviting || !inviteEmail}>
                    {isInviting ? "Sending..." : "Send Invitation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                {isOwner && <TableHead className="w-[70px]"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const RoleIcon = roleIcons[member.role]
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.user.avatar || "/placeholder.svg"} alt={member.user.name} />
                          <AvatarFallback>{member.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`gap-1 ${roleColors[member.role]}`}>
                        <RoleIcon className="h-3 w-3" />
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </TableCell>
                    {isOwner && (
                      <TableCell>
                        {member.role !== "owner" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(member.id, member.role === "admin" ? "member" : "admin")
                                }
                              >
                                {member.role === "admin" ? "Demote to Member" : "Promote to Admin"}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => handleRevoke(member.id)}>
                                Remove Member
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
