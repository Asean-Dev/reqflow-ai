import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import axios, { endpoints, fetcher } from "../../../../utils/axios";
import { IChatConversation, IChatMessage } from "./types";

export function keyBy<T>(
  array: T[],
  key: keyof T
): {
  [key: string]: T;
} {
  return (array || []).reduce((result, item) => {
    const keyValue = key ? item[key] : item;

    return { ...result, [String(keyValue)]: item };
  }, {});
}
const CHART_ENDPOINT = endpoints.chat;

const enableServer = false;
const swrOptions = {
  revalidateIfStale: enableServer,
  revalidateOnFocus: enableServer,
  revalidateOnReconnect: enableServer,
};

type ConversationData = {
  conversation: IChatConversation;
};

export function useGetConversation(conversationId: string) {
  const url = conversationId
    ? [CHART_ENDPOINT, { params: { conversationId, endpoint: "conversation" } }]
    : "";

  const { data, isLoading, error, isValidating } = useSWR<ConversationData>(
    url,
    fetcher,
    {
      ...swrOptions,
      fallbackData: {
        conversation: {
          id: conversationId,
          messages: [],
          type: "text",
          unreadCount: 0,
        },
      },
    }
  );

  const memoizedValue = useMemo(
    () => ({
      conversation: data?.conversation,
      conversationLoading: isLoading,
      conversationError: error,
      conversationValidating: isValidating,
    }),
    [data?.conversation, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useSendMessage(conversationId: string) {
  const url = [
    CHART_ENDPOINT,
    { params: { conversationId, endpoint: "conversation" } },
  ];

  const { data, isLoading, error, isValidating } = useSWR<ConversationData>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      conversation: data?.conversation,
      conversationLoading: isLoading,
      conversationError: error,
      conversationValidating: isValidating,
    }),
    [data?.conversation, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function sendMessage(
  conversationId: string,
  messageData: IChatMessage
) {
  const conversationsUrl = [
    CHART_ENDPOINT,
    { params: { endpoint: "conversations" } },
  ];

  const conversationUrl = [
    CHART_ENDPOINT,
    { params: { conversationId, endpoint: "conversation" } },
  ];

  /**
   * Work on server
   */
  if (enableServer) {
    const data = { conversationId, messageData };
    await axios.put(CHART_ENDPOINT, data);
  }

  /**
   * Work in local
   */
  mutate(
    conversationUrl,
    (currentData) => {
      if (!currentData || !currentData.conversation) {
        return {
          conversation: { id: conversationId, messages: [messageData] },
        };
      }
      const currentConversation: IChatConversation = currentData.conversation;
      const conversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, messageData],
      };
      return { ...currentData, conversation };
    },
    false
  );

  mutate(
    conversationsUrl,
    (currentData) => {
      console.log("currentData", currentData);
      if (!currentData || !currentData.conversations) return currentData;

      const currentConversations: IChatConversation[] =
        currentData.conversations;

      const conversations: IChatConversation[] = currentConversations.map(
        (conversation: IChatConversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, messageData],
              }
            : conversation
      );

      return { ...currentData, conversations };
    },
    false
  );
}
