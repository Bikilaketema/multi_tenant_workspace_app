// hooks/organizationHooks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../lib/api/teams';

export function useTeams(organizationId: string) {
  return useQuery({
    queryKey: ['teams', organizationId],
    queryFn: () => api.fetchTeams(organizationId)
    },);
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createTeam,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teams'] }),
  });
}
