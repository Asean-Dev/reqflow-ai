export type IDateValue = string | number | null;
export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: IDateValue;
  modifiedAt: IDateValue;
};

export type IChatConversation = {
  id: string;
  type: string;
  unreadCount: number;
  messages: IChatMessage[];
};

export type ConversationsData = {
  conversations: IChatConversation[];
};

export type IChatMessage = {
  id: string;
  body: string;
  senderId: string;
  contentType: string;
  createdAt: IDateValue;
  attachments: IChatAttachment[];
};
