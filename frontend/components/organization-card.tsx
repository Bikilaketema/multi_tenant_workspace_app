import type { Organization } from "@/lib/types/types"
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
import { Crown, ExternalLink, MoreHorizontal, Settings, Trash2 } from "lucide-react"
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

const handleOpen = () => {
    router.push(`/dashboard/${organization.id}/table`)
  }
  return (
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
  )
}