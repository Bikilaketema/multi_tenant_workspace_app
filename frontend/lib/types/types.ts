export interface Organization {
  id: string
  name: string
  role: "owner" | "admin" | "member"
  logo?: string
  totalMembers: number
  createdAt: string
}

export interface Invitation {
  id: string
  organizationName: string
  invitedBy: string
  role: "admin" | "member"
  invitedAt: string
}

export interface Outline {
  id: string
  header: string
  sectionType: string
  status: string
  target: number
  limit: number
  reviewer: string
}

export interface InviteData {
  id: string;
  email: string;
  role: string;
  organizationId: string;
  resend: boolean;
  inviterId?: string;
  inviterName?: string;
  organizationName?: string;
}

export type SectionType = "TableOfContents"| "ExecutiveSummary" |"TechnicalApproach" | "Design" | "Capabilities" | "FocusDocument" | "Narrative"
export type Status = "Completed" | "InProgress" | "Pending"