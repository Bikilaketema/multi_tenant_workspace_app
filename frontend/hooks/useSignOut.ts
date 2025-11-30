"use client"

import { authClient } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useSignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await authClient.signOut()

      toast.success("Logged out!")
      router.push("/sign-in")
    } catch (error) {
      toast.error("Something went wrong during logout")
    }
  }

  return { handleSignOut }
}
