export interface Organization {
  id: string
  name: string
  role: "owner" | "admin" | "member"
  logo?: string
  createdAt: string
}

export interface Invitation {
  id: string
  organizationName: string
  invitedBy: string
  role: "admin" | "member"
  invitedAt: string
}