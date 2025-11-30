import { api_url } from "../config";

export async function createTeam(data: {
  name: string;
  organizationId: string;
}) {
  const res = await fetch(`${api_url}/api/team/${data.organizationId}/create-team`, {
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
  const res = await fetch(`${api_url}/api/team/${organizationId}/list-teams`, {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch teams');
  }
  return res.json();
}

export async function deleteTeam(organizationId: string, teamId: string) {
  const res = await fetch(`${api_url}/api/team/${organizationId}/${teamId}/delete-team`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to delete team');
  }
  return res.json();
}