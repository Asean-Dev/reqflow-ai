"use client";

import { Container } from "@/components/container/container";
import {
  sendMessage,
  useGetConversation,
} from "@/modules/interview-room/actions";
import { Card, CardHeader, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { InterviewRoomInput } from "../input";
import { Layout } from "../layout";
import { InterviewRoomMain } from "../main";

export function InterviewRoomView() {
  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get("id") || "ai01";

  const { conversation, conversationLoading } = useGetConversation(
    `${selectedConversationId}`
  );

  useEffect(() => {
    if (conversation) {
      const handleSendMessage = async () => {
        await sendMessage(selectedConversationId, {
          id: "1",
          body: "สวัสดีครับ มีอะไรช่วยไหม?",
          senderId: "1",
          contentType: "text",
          createdAt: dayjs().toISOString(),
          attachments: [],
        });
      };
      handleSendMessage();
    }
  }, []);

  return (
    <Container>
      <Card sx={{ width: "100%", p: 2 }}>
        <Typography variant="h1">Chat with AI</Typography>
        <Divider sx={{ mb: 2 }} />
        <Layout
          slots={{
            main: <InterviewRoomMain messages={conversation?.messages || []} />,
            input: (
              <InterviewRoomInput
                selectedConversationId={selectedConversationId}
                conversationLoading={conversationLoading}
              />
            ),
          }}
        />
      </Card>
    </Container>
  );
}
