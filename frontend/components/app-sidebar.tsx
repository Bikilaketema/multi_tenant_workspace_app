"use client"

import * as React from "react"
import { GalleryVerticalEnd, Table2, Users, ChevronsUpDown, LogOut, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useOrganizations } from "@/hooks/useOrganizations"
import { useTeams, useCreateTeam, useDeleteTeam } from "@/hooks/useTeams"
import { authClient } from "@/lib/auth"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useSignOut } from "@/hooks/useSignOut"


const navItems = [
  {
    title: "Table",
    url: "/dashboard/table",
    icon: Table2,
  },
  {
    title: "Team Info / Setup",
    url: "/dashboard/team",
    icon: Users,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const { handleSignOut } = useSignOut();
  
  const { data: organizations = [] } = useOrganizations();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const { org_id } = useParams<{ org_id: string }>();

  const organization = organizations?.find(org => org.id === org_id);

  const {data: teams = [] } = useTeams(org_id!);

    const createTeamMutation = useCreateTeam()
  const deleteTeamMutation = useDeleteTeam()

  const [newTeamName, setNewTeamName] = React.useState("")
  const [isDialogOpen, setDialogOpen] = React.useState(false)

    const handleCreateTeam = async () => {
    if (!newTeamName) return
    try {
      await createTeamMutation.mutateAsync({ name: newTeamName, organizationId: org_id! })
      toast.success('Team created successfully!')
      setNewTeamName("")
      setDialogOpen(false)
    } catch (err) {
      console.error("Failed to create team", err)
    }
  }

  const handleDeleteTeam = async (teamId: string) => {
    if (!org_id) return
    try {
      await deleteTeamMutation.mutateAsync({ organizationId: org_id, teamId })
    } catch (err) {
      console.error("Failed to delete team", err)
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square h-8 w-8 items-center justify-center rounded-lg">
                    <GalleryVerticalEnd className="h-4 w-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{organization?.name || "Acme Inc"}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>

                {teams.map((team: any) => (
                  <DropdownMenuItem
                    key={team.id}
                   // onClick={() => router.push(`/dashboard/${team.id}/table`)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex h-6 w-6 items-center justify-center rounded-sm">
                          <GalleryVerticalEnd className="h-4 w-4" />
                        </div>
                        <span>{team.name}</span>
                    </div>
                  </DropdownMenuItem>
                ))}

                {teams.length === 0 && (
                  <DropdownMenuItem disabled className="opacity-60">No Teams</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Team</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content omitted for brevity */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name || "User"}</span>
                    <span className="truncate text-xs">{user?.email || "user@example.com"}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />

      {/* Dialog for creating a new team */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Create New Team</h3>
            <input
              type="text"
              placeholder="Team Name"
              className="w-full border p-2 rounded mb-4"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black/50 text-white rounded hover:bg-black"
                onClick={handleCreateTeam}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
