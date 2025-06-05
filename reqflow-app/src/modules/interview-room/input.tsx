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
import { InterviewRoomDialog } from "./dialog";
import { useBoolean } from "@/hooks/use-boolean";

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
  const isSummary = useBoolean(false);
  const [summary, setSummary] = useState<
    | {
        companyName: string;
        businessProblem: string;
        budget: string;
        purpose: string;
        scopeSummary: string;
        sowPdfPath: string;
      }
    | {}
  >({});
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
          senderId: "user",
          contentType: "text",
          createdAt: fSub({ minutes: 1 }),
          attachments: [],
        };
        setMessage("");
        const response = await sendMessage(selectedConversationId, messageData);
        if (response?.data?.success) {
          setSummary({
            ...response.data.fields,
            ...(response.data.sow_pdf_path && {
              sowPdfPath: response.data.sow_pdf_path,
            }),
          });
          isSummary.onTrue();
        }
      }
    },
    [message, selectedConversationId, user.id]
  );

  return (
    <Stack direction="row" sx={{ width: 1 }}>
      <InterviewRoomDialog data={summary} isOpen={isSummary} />
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
