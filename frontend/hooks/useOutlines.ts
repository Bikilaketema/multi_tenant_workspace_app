import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/lib/api/outline';
import type { Outline } from '@/lib/types/types';

export function useOutlines(org_id: string) {
  return useQuery<Outline[], Error>({
    queryKey: ['outlines', org_id],
    queryFn: () => api.fetchOutlines(org_id),
    enabled: !!org_id,
  });
}

export function useCreateOutline(org_id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      header: string;
      sectionType: string;
      status: string;
      target: number;
      limit: number;
      reviewer: string;
    }) => api.createOutlines(org_id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outlines', org_id] }),
  });
}

export function useEditOutline(org_id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ outline_id, updates }: { outline_id: string; updates: Partial<Outline> }) =>
      api.editOutlines(org_id, outline_id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlines", org_id] });
    }
  });
}

export function useDeleteOutline(org_id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (outline_id: string) => api.deleteOutlines(org_id, outline_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outlines', org_id] }),
  });
}
