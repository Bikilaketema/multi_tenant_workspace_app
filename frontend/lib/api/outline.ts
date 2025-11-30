import { api_url } from "../config";

export async function fetchOutlines(org_id: string) {
  const res = await fetch(`${api_url}/api/organization/${org_id}/outlines`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch outlines');
  return res.json();
}

export async function createOutlines(
  org_id: string,
  data: {
    header: string;
    sectionType: string;
    status: string;
    target: number;
    limit: number;
    reviewer: string;
  }
) {
  const res = await fetch(`${api_url}/api/organization/${org_id}/outlines`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create outline');
  return res.json();
}

export async function editOutlines(
  org_id: string,
  outline_id: string,
  updates: Partial<{
    header: string;
    sectionType: string;
    status: string;
    target: number;
    limit: number;
    reviewer: string;
  }>
) {
  const res = await fetch(`${api_url}/api/organization/${org_id}/outlines/${outline_id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Failed to update outline");
  return res.json();
}


export async function deleteOutlines(org_id: string, outline_id: string) {
  const res = await fetch(
    `${api_url}/api/organization/${org_id}/outlines/${outline_id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error('Failed to delete outline');
  return res.json();
}
