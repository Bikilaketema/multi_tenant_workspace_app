// lib/api/organization.ts
export async function fetchOrganizations() {
  const res = await fetch('http://localhost:3000/api/organization', {
    credentials: 'include', // cookies/session
  });
  if (!res.ok) {
    throw new Error('Failed to fetch organizations');
  }
  return res.json();
}

export async function createOrganization(data: {
  name: string;
  slug: string;
  logo?: string;
  metadata?: Record<string, any>;
}) {
  const res = await fetch('http://localhost:3000/api/organization', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to create organization');
  }
  return res.json();
}

export async function deleteOrganization(organizationId: string) {
  const res = await fetch(`http://localhost:3000/api/organization/${organizationId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to delete organization');
  }
  return res.json();
}

export async function fetchOrganizationMembers(organizationId: string) {
  const res = await fetch(`http://localhost:3000/api/organization/${organizationId}/members`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch organization members');
  }
  return res.json();
}

export async function inviteUserToOrg(organizationId: string, data: {
  email: string;
  role: string;
  organizationId: string;
  resend: boolean;
 } ){

  const res = await fetch(`http://localhost:3000/api/organization/${organizationId}/invite-member`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });


  if (!res.ok) {
    throw new Error('Failed to invite the user!')
  }

  return res.json()
}
