// hooks/organizationHooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../lib/api/organization';
import type { Organization, InviteData } from '@/lib/types/types';

export function useOrganizations() {
  return useQuery<Organization[], Error>({
    queryKey: ['organizations'],
    queryFn: api.fetchOrganizations,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createOrganization,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizations'] }),
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteOrganization,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizations'] }),
  });
}

export function useInviteUserToOrg() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<InviteData, "id">) => api.inviteUserToOrg(data.organizationId, data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['organization', data.organizationId, 'members'] });
    },
  });
}

export function useOrganizationMembers(organizationId: string) {
  return useQuery({
    queryKey: ['organization', organizationId, 'members'],
    queryFn: () => api.fetchOrganizationMembers(organizationId),
  });
}
