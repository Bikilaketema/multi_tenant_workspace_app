import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../lib/api/user';
import type { InviteData } from '@/lib/types/types';

export function useMyInvitations() {
  return useQuery<InviteData[], Error>({
    queryKey: ['my-invitations'],
    queryFn: api.getMyInvitations,
  });
}

export function useAcceptInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ organizationId, data }: { organizationId: string; data: { invitationId: string } }) =>
      api.acceptInvitation(organizationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-invitations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

export function useRejectInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ organizationId, data }: { organizationId: string; data: { invitationId: string } }) =>
      api.rejectInvitation(organizationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-invitations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}

export function useLeaveOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { organizationId: string }) => api.leaveOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
}
