// import type { IChatParticipant } from "src/types/chat";

import { useRef, useMemo, useState, useCallback } from "react";

import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { Icons } from "@/icons";
import { sendMessage } from "./actions";
import { fSub } from "../../../utils/format-time";
import { uuidv4 } from "../../../utils/uuidv4";

// import { Iconify } from "src/components/iconify";

// import { useMockedUser } from "src/auth/hooks";

// ----------------------------------------------------------------------

type Props = {
  selectedConversationId: string;
  conversationLoading: boolean;
};

export function InterviewRoomInput({
  selectedConversationId,
  conversationLoading,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  // สมมติคุณมี user context
  const user = { id: "me" }; // เปลี่ยนเป็น useMockedUser หรือ context จริง

  const handleChangeMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && message) {
        const messageData = {
          id: uuidv4(),
          body: message,
          senderId: user.id,
          contentType: "text",
          createdAt: fSub({ minutes: 1 }),
          attachments: [],
        };
        await sendMessage(selectedConversationId, messageData);
        setMessage("");
      }
    },
    [message, selectedConversationId, user.id]
  );

  return (
    <Stack direction="row" sx={{ width: 1 }}>
      <InputBase
        name="chat-message"
        id="chat-message-input"
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder={conversationLoading ? "Loading..." : "Type a message"}
        fullWidth
        disabled={conversationLoading}
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton>
              <Icons.file />
            </IconButton>
            <IconButton>
              <Icons.image />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          width: 1,
          height: 40,
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          borderRadius: "50px",
        }}
      />

      <input type="file" ref={fileRef} style={{ display: "none" }} />
    </Stack>
  );
}
