import { Scrollbar } from "@/components/scrollbar/scrollbar";
import { useMessagesScroll } from "@/hooks/use-messages-scroll";
import { alpha, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { IChatMessage } from "./actions/types";
import { ChatMessageItem as MessageList } from "./message-list";

type Props = {
  messages: IChatMessage[];
};

export function InterviewRoomMain({ messages = [] }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const messagesMemo = useMemo(() => messages, [messages]);

  return (
    <Stack
      flexGrow={1}
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{
        height: "500px",
        borderRadius: 2,
        border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.3)}`,
        mb: 2,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.01),
      }}
    >
      <Scrollbar
        ref={messagesEndRef}
        sx={{
          px: 3,
          pt: 5,
          pb: 3,
          flex: "1 1 auto",
          width: "100%",
          height: "100%",
        }}
      >
        {messagesMemo.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
      </Scrollbar>
    </Stack>
  );
}

export const ChatMessageItem = React.memo(function ChatMessageItem({
  message,
}: {
  message: IChatMessage;
}) {
  return <MessageList key={message.id} message={message} />;
});
