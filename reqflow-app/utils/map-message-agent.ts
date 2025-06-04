import dayjs from "dayjs";
import { uuidv4 } from "./uuidv4";
import { IChatMessage } from "@/modules/interview-room/actions/types";

export function mapResponseToMessageData(res: string): IChatMessage {
  return {
    id: uuidv4(),
    body: res,
    senderId: "agent",
    contentType: "text",
    createdAt: dayjs().toISOString(),
    attachments: [],
  };
}
