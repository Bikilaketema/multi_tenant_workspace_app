export async function createTeam(data: {
  name: string;
  organizationId: string;
}) {
  const res = await fetch(`http://localhost:3000/api/team/${data.organizationId}/create-team`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to create team');
  }
  return res.json();
}

export async function fetchTeams(organizationId: string) {
  const res = await fetch(`http://localhost:3000/api/team/${organizationId}/list-teams`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch teams');
  }
  return res.json();
}