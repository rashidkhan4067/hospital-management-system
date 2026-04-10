import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingService } from '../api/messagingService';

/**
 * 🛰️ useMessaging (Clinical Communication Hook)
 * Subscribes to the Hospital's real-time messaging matrix.
 */
export function useMessaging(selectedContactId = null) {
  const queryClient = useQueryClient();

  // 🏥 Contacts Query
  const { data: contacts, isLoading: loadingContacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => messagingService.getContacts(),
    staleTime: Infinity,
  });

  // 📬 Thread Query
  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ['messages', selectedContactId],
    queryFn: () => messagingService.getThread(selectedContactId),
    enabled: !!selectedContactId,
    refetchInterval: 3000, // Poll every 3 seconds for simulated "Live" feel
  });

  // 📤 Dispatch Mutation
  const sendMutation = useMutation({
    mutationFn: ({ receiverId, text }) => messagingService.sendMessage(receiverId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', selectedContactId] });
    }
  });

  return {
    contacts: contacts || [],
    loadingContacts,

    messages: messages || [],
    loadingMessages,

    sendMessage: sendMutation.mutate,
    isSending: sendMutation.isLoading
  };
}
