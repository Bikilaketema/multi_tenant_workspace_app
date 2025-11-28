"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
//import { useAuth } from "@/lib/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const { user, organization, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/sign-in")
  //   } else if (!isLoading && user && !organization) {
  //     router.push("/create-organization")
  //   }
  // }, [user, organization, isLoading, router])

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  //     </div>
  //   )
  // }

  // if (!user || !organization) {
  //   return null
  // 
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
