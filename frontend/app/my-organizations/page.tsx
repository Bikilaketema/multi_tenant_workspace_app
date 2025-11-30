"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Plus, Mail, Crown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useOrganizations, useCreateOrganization, useDeleteOrganization } from "@/hooks/useOrganizations"
import type { Invitation } from "@/lib/types/types"
import { OrganizationCard } from "@/components/organization-card"
import { useMyInvitations, useAcceptInvitation, useRejectInvitation, useLeaveOrganization } from "@/hooks/useUser"
import { authClient } from "@/lib/auth"
import { toast } from "sonner"
import { useSignOut } from "@/hooks/useSignOut"

export default function OrganizationsPage() {
  const router = useRouter()
  const { data: orgs, isLoading, isError, refetch } = useOrganizations()
  const createOrgMutation = useCreateOrganization()
  const deleteOrgMutation = useDeleteOrganization()
  const acceptInvitationMutation = useAcceptInvitation()
  const rejectInvitationMutation = useRejectInvitation()
  const leaveOrganizationMutation = useLeaveOrganization()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newOrgName, setNewOrgName] = useState("")
  const [newOrgSlug, setNewOrgSlug] = useState("")
  const [invitationDialogOpen, setInvitationDialogOpen] = useState(false);

  const { handleSignOut } = useSignOut()

  const {data: invitations = [] } = useMyInvitations();

  const handleCreateOrganization = async () => {
    if (!newOrgName.trim()) return
    try {
      await createOrgMutation.mutateAsync({
        name: newOrgName,
        slug: newOrgSlug,
      })
      setNewOrgName("")
      setCreateDialogOpen(false)
      toast.success('Organization created successfully!')
    } catch (err) {
      console.error("Failed to create organization:", err)
    }
  }

  const handleDeleteOrganization = async (orgId: string) => {
    try {
      await deleteOrgMutation.mutateAsync(orgId)
      toast.success('Organization deleted successfully!')
    } catch (err) {
      console.error("Failed to delete organization:", err)
    }
  }

  const handleRejectInvitation = async (invitationId: string, organizationId: string) => {
    await rejectInvitationMutation.mutateAsync(
      { organizationId, data: { invitationId } },
      {
        onSuccess: () => setInvitationDialogOpen(false),
      }
    );
    toast.success('Invitation rejected!')
  }


  const handleAcceptInvitation = async (invitationId: string, organizationId: string) => {
    await acceptInvitationMutation.mutateAsync(
      { organizationId, data: { invitationId } },
      {
        onSuccess: () => setInvitationDialogOpen(false),
      }
    );
    toast.success('Invitation accepted!')
  };

  const handleLeaveOrganization = async (organizationId: string) => {
    try {
      await leaveOrganizationMutation.mutateAsync({ organizationId })
      toast.success('You have left the organization!')
    } catch (err) {
      console.error("Failed to leave organization:", err)
    }
  };


  const getRoleBadge = (role: string) => {
    switch (role) {
      case "owner":
        return (
          <Badge variant="outline" className="gap-1 border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <Crown className="h-3 w-3" />
            Owner
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="outline" className="gap-1 border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            Admin
          </Badge>
        )
      default:
        return <Badge variant="outline" className="gap-1">Member</Badge>
    }
  }

  if (isLoading) return <div>Loading organizations...</div>
  if (isError) return <div>Failed to load organizations.</div>

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground">Manage your organizations and team workspaces</p>
          </div>

          <div className="flex gap-3">
            {/* Invitations button */}
           <Dialog open={invitationDialogOpen} onOpenChange={setInvitationDialogOpen}>

              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Mail className="h-4 w-4" />
                  Invitations
                  {invitations.length > 0 && (
                    <Badge className="ml-1 h-5 w-5 rounded-full p-0 text-xs">{invitations.length}</Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Pending Invitations</DialogTitle>
                  <DialogDescription>You have been invited to join the following organizations</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {invitations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Mail className="mb-3 h-10 w-10 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">No pending invitations</p>
                    </div>
                  ) : (
                    invitations.map((invitation) => (
                      <Card key={invitation.id}>
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {invitation.organizationName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Invited to {invitation.organizationName} organization by {invitation.inviterName} as a {invitation.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleRejectInvitation(invitation.id, invitation.organizationId)}>Decline</Button>
                            <Button size="sm" onClick={() => handleAcceptInvitation(invitation.id, invitation.organizationId)}>Accept</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Create Organization */}
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Organization
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Organization</DialogTitle>
                  <DialogDescription>Create a new organization to collaborate with your team</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      placeholder="Enter organization name"
                      value={newOrgName}
                      onChange={(e) => setNewOrgName(e.target.value)}
                    />
                  </div>
                    <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Slug</Label>
                    <Input
                      id="org-name"
                      placeholder="Enter organization slug"
                      value={newOrgSlug}
                      onChange={(e) => setNewOrgSlug(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateOrganization} disabled={!newOrgName.trim()}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white font-medium transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>

          </div>
        </div>

        {/* Organizations List */}
       <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All ({orgs?.length || 0})</TabsTrigger>
          <TabsTrigger value="owner">Owned ({orgs?.filter(o => o.role === "owner").length || 0})</TabsTrigger>
          <TabsTrigger value="member">Member ({orgs?.filter(o => o.role === "member").length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orgs?.map((org: any) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              getRoleBadge={getRoleBadge}
              onDelete={handleDeleteOrganization}
              onLeave={handleLeaveOrganization}
            />
          ))}
        </TabsContent>

        <TabsContent value="owner" className="space-y-4">
          {orgs?.filter(o => o.role === "owner").map((org: any) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              getRoleBadge={getRoleBadge}
              onDelete={handleDeleteOrganization}
              onLeave={handleLeaveOrganization}
            />
          ))}
        </TabsContent>

        <TabsContent value="member" className="space-y-4">
          {orgs?.filter(o => o.role === "member").map((org: any) => (
            <OrganizationCard
              key={org.id}
              organization={org}
              getRoleBadge={getRoleBadge}
              onDelete={handleDeleteOrganization}
              onLeave={handleLeaveOrganization}
            />
          ))}
        </TabsContent>
       </Tabs>
      </div>
    </div>
  )
}
