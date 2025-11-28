// hooks/organizationHooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../lib/api/organization';
import type { Organization } from '@/lib/types/types';

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
