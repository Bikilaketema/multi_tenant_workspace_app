"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { authClient } from "@/lib/auth"
import { useSingleInvitation, useAcceptInvitation, useRejectInvitation } from "@/hooks/useUser"
import { Button } from "@/components/ui/button"

export default function InvitePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invitationId = searchParams?.get("invitationId") || ""

  const { data: session, isPending: sessionLoading } = authClient.useSession()
  const { data: invitation, isLoading: invitationLoading, error: invitationError } = useSingleInvitation(invitationId)

  const acceptInvitation = useAcceptInvitation()
  const rejectInvitation = useRejectInvitation()

  useEffect(() => {
    if (!session && !sessionLoading) {
      router.push(`/sign-in?redirect=/invite?invitationId=${invitationId}`)
    }
  }, [session, sessionLoading, router, invitationId])

  const handleAccept = async () => {
    if (!invitation) return
    await acceptInvitation.mutateAsync({
      organizationId: invitation.organizationId,
      data: { invitationId: invitation.id },
    })
    router.push(`/my-organizations`)
  }

  const handleReject = async () => {
    if (!invitation) return
    await rejectInvitation.mutateAsync({
      organizationId: invitation.organizationId,
      data: { invitationId: invitation.id },
    })
    router.push("/my-organizations")
  }

  if (!invitationId) return <p>Invalid invitation link</p>
  if (sessionLoading || invitationLoading) return <p>Loading...</p>
  if (invitationError) return <p className="text-red-600">Error loading invitation</p>
  if (!invitation) return <p>Invitation not found</p>

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border border-gray-200 rounded-xl shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Invitation to {invitation.organizationName}</h1>
      <p className="mb-6 text-gray-600">You have been invited as <span className="font-medium">{invitation.role}</span>.</p>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <Button
          onClick={handleAccept}
          className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
        >
          Accept
        </Button>
        <Button
          onClick={handleReject}
          variant="outline"
          className="w-full sm:w-auto border-gray-300 hover:bg-gray-100"
        >
          Decline
        </Button>
      </div>
    </div>
  )
}
