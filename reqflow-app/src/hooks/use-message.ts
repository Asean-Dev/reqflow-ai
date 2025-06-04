import type { IChatMessage } from "@/modules/interview-room/actions/types";

// ----------------------------------------------------------------------

type Props = {
  currentUserId: string;
  message: IChatMessage;
};

export function useMessage({ message, currentUserId }: Props) {
  const senderDetails =
    message.senderId === currentUserId
      ? { type: "me" }
      : { avatarUrl: "", firstName: "AI" };

  const me = senderDetails.type === "me";

  const hasImage = message.contentType === "image";

  return { hasImage, me, senderDetails };
}
