export async function getMyInvitations() {
  const res = await fetch(`http://localhost:3000/api/user/my-invitations`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user invitations');
  }

  return res.json();
}

export async function acceptInvitation(organizationId: string, data: {
    invitationId: string;
}) {
  const res = await fetch(`http://localhost:3000/api/user/${organizationId}/accept-invitation`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to accept invitation');
  }

  return res.json();
}

export async function rejectInvitation(organizationId: string, data: {
    invitationId: string;
}) {
  const res = await fetch(`http://localhost:3000/api/user/${organizationId}/reject-invitation`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to reject invitation');
  }

  return res.json();
}

export async function leaveOrganization(data: { organizationId: string }) {
  const res = await fetch(
    `http://localhost:3000/api/user/${data.organizationId}/leave-organization`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error('Failed to leave organization');
  }

  return res.json();
}
