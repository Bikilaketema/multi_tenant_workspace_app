// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// export type UserRole = "owner" | "admin" | "member"

// export interface User {
//   id: string
//   email: string
//   name: string
//   avatar?: string
// }

// export interface Organization {
//   id: string
//   name: string
//   plan: string
// }

// export interface Member {
//   id: string
//   userId: string
//   user: User
//   role: UserRole
//   joinedAt: Date
// }

// interface AuthContextType {
//   user: User | null
//   organization: Organization | null
//   members: Member[]
//   currentMemberRole: UserRole | null
//   isLoading: boolean
//   signIn: (email: string, password: string) => Promise<void>
//   signUp: (email: string, password: string, name: string) => Promise<void>
//   signOut: () => void
//   createOrganization: (name: string, plan: string) => Promise<void>
//   joinOrganization: (inviteCode: string) => Promise<void>
//   inviteMember: (email: string, role: UserRole) => Promise<void>
//   revokeMembership: (memberId: string) => Promise<void>
//   updateMemberRole: (memberId: string, role: UserRole) => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // Mock data for demo purposes
// const mockUsers: User[] = [
//   { id: "1", email: "eddie@acme.com", name: "Eddie Lake", avatar: "/eddie.jpg" },
//   { id: "2", email: "jamik@acme.com", name: "Jamik Tashpulatov", avatar: "/jamik.jpg" },
//   { id: "3", email: "sarah@acme.com", name: "Sarah Johnson", avatar: "/diverse-group-smiling.png" },
// ]

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [organization, setOrganization] = useState<Organization | null>(null)
//   const [members, setMembers] = useState<Member[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for existing session
//     const savedUser = localStorage.getItem("auth_user")
//     const savedOrg = localStorage.getItem("auth_org")
//     const savedMembers = localStorage.getItem("auth_members")

//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     if (savedOrg) {
//       setOrganization(JSON.parse(savedOrg))
//     }
//     if (savedMembers) {
//       setMembers(JSON.parse(savedMembers))
//     }
//     setIsLoading(false)
//   }, [])

//   const signIn = async (email: string, password: string) => {
//     setIsLoading(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     const existingUser = mockUsers.find((u) => u.email === email)
//     const newUser = existingUser || {
//       id: Date.now().toString(),
//       email,
//       name: email.split("@")[0],
//     }

//     setUser(newUser)
//     localStorage.setItem("auth_user", JSON.stringify(newUser))

//     // Check if user has an organization
//     const savedOrg = localStorage.getItem("auth_org")
//     if (savedOrg) {
//       setOrganization(JSON.parse(savedOrg))
//     }
//     setIsLoading(false)
//   }

//   const signUp = async (email: string, password: string, name: string) => {
//     setIsLoading(true)
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     const newUser: User = {
//       id: Date.now().toString(),
//       email,
//       name,
//     }

//     setUser(newUser)
//     localStorage.setItem("auth_user", JSON.stringify(newUser))
//     setIsLoading(false)
//   }

//   const signOut = () => {
//     setUser(null)
//     setOrganization(null)
//     setMembers([])
//     localStorage.removeItem("auth_user")
//     localStorage.removeItem("auth_org")
//     localStorage.removeItem("auth_members")
//   }

//   const createOrganization = async (name: string, plan: string) => {
//     if (!user) return

//     await new Promise((resolve) => setTimeout(resolve, 500))

//     const newOrg: Organization = {
//       id: Date.now().toString(),
//       name,
//       plan,
//     }

//     // Creator becomes owner
//     const ownerMember: Member = {
//       id: Date.now().toString(),
//       userId: user.id,
//       user,
//       role: "owner",
//       joinedAt: new Date(),
//     }

//     // Add some mock team members
//     const mockMembers: Member[] = [
//       ownerMember,
//       {
//         id: "m2",
//         userId: "2",
//         user: mockUsers[1],
//         role: "admin",
//         joinedAt: new Date(),
//       },
//       {
//         id: "m3",
//         userId: "3",
//         user: mockUsers[2],
//         role: "member",
//         joinedAt: new Date(),
//       },
//     ]

//     setOrganization(newOrg)
//     setMembers(mockMembers)
//     localStorage.setItem("auth_org", JSON.stringify(newOrg))
//     localStorage.setItem("auth_members", JSON.stringify(mockMembers))
//   }

//   const joinOrganization = async (inviteCode: string) => {
//     if (!user) return

//     await new Promise((resolve) => setTimeout(resolve, 500))

//     // Simulate joining an existing organization
//     const newOrg: Organization = {
//       id: "org_" + inviteCode,
//       name: "Acme Inc",
//       plan: "Enterprise",
//     }

//     const newMember: Member = {
//       id: Date.now().toString(),
//       userId: user.id,
//       user,
//       role: "member",
//       joinedAt: new Date(),
//     }

//     const existingMembers: Member[] = [
//       {
//         id: "m1",
//         userId: "1",
//         user: mockUsers[0],
//         role: "owner",
//         joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
//       },
//       {
//         id: "m2",
//         userId: "2",
//         user: mockUsers[1],
//         role: "admin",
//         joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
//       },
//       newMember,
//     ]

//     setOrganization(newOrg)
//     setMembers(existingMembers)
//     localStorage.setItem("auth_org", JSON.stringify(newOrg))
//     localStorage.setItem("auth_members", JSON.stringify(existingMembers))
//   }

//   const inviteMember = async (email: string, role: UserRole) => {
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     const newMember: Member = {
//       id: Date.now().toString(),
//       userId: Date.now().toString(),
//       user: {
//         id: Date.now().toString(),
//         email,
//         name: email.split("@")[0],
//       },
//       role,
//       joinedAt: new Date(),
//     }

//     const updatedMembers = [...members, newMember]
//     setMembers(updatedMembers)
//     localStorage.setItem("auth_members", JSON.stringify(updatedMembers))
//   }

//   const revokeMembership = async (memberId: string) => {
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     const updatedMembers = members.filter((m) => m.id !== memberId)
//     setMembers(updatedMembers)
//     localStorage.setItem("auth_members", JSON.stringify(updatedMembers))
//   }

//   const updateMemberRole = async (memberId: string, role: UserRole) => {
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     const updatedMembers = members.map((m) => (m.id === memberId ? { ...m, role } : m))
//     setMembers(updatedMembers)
//     localStorage.setItem("auth_members", JSON.stringify(updatedMembers))
//   }

//   const currentMemberRole = user && members.length > 0 ? members.find((m) => m.userId === user.id)?.role || null : null

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         organization,
//         members,
//         currentMemberRole,
//         isLoading,
//         signIn,
//         signUp,
//         signOut,
//         createOrganization,
//         joinOrganization,
//         inviteMember,
//         revokeMembership,
//         updateMemberRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
