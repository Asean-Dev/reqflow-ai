import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";

import axiosServer, { endpoints, fetcher } from "../../../../utils/axios";
import { IChatConversation, IChatMessage } from "./types";
import { mapResponseToMessageData } from "../../../../utils/map-message-agent";
import {
  addContext,
  getContextFromLocalStorage,
} from "../../../../utils/local-storage";
import { getCookie } from "../../../../utils/token";

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

const enableServer = true;
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
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
  const conversationUrl = [
    CHART_ENDPOINT,
    { params: { conversationId, endpoint: "conversation" } },
  ];

  console.log("messageData", messageData);
  /**
   * Work on server
   */
  mutate(
    conversationUrl,
    (currentData) => ({
      ...(currentData ?? {}),
      conversation: {
        ...(currentData?.conversation ?? {}),
        messages: [...(currentData?.conversation?.messages ?? []), messageData],
      },
    }),
    false
  );

  if (enableServer && messageData.senderId === "user") {
    const contextStorage = getContextFromLocalStorage();
    const token = getCookie("token");
    console.log("token", token);
    console.log("contextStorage", contextStorage);
    const data = {
      conversation: messageData.body,
      fields: contextStorage?.context || {},
    };

    const response = await axiosServer.post(endpoints.agent, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    const message = mapResponseToMessageData(response.data.data.question);
    addContext(response.data.data.fields);
    console.log("message", message);
    mutate(
      conversationUrl,
      (currentData) => ({
        ...currentData,
        conversation: {
          ...currentData.conversation,
          messages: [...currentData.conversation.messages, message],
        },
      }),
      false
    );
    if (response.data.code === 200) {
      return response.data;
    }
  }
}
