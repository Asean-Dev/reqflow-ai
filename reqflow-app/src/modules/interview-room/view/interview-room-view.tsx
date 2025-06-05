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
import { uuidv4 } from "../../../../utils/uuidv4";
import { removeFromContext } from "../../../../utils/local-storage";
import { SignInView } from "@/modules/sign-in/view/sign-in-view";
import { getCookie } from "../../../../utils/token";

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
          id: uuidv4(),
          body: "ขอข้อมูลเบื้องต้นสำหรับเก็บ Requirement โปรดตอบคำถามตามนี้ครับ…",
          senderId: "agent",
          contentType: "text",
          createdAt: dayjs().toISOString(),
          attachments: [],
        });
      };
      removeFromContext();
      handleSendMessage();
    }
  }, []);

  return (
    <Container>
      <Card sx={{ width: "100%", p: 2 }}>
        <SignInView />
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
