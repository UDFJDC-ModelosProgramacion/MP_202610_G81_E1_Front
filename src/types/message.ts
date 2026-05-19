export interface MessageDTO {
  id?: number;
  content: string;
  sendDate: string;   // ISO date: "YYYY-MM-DD"
  senderId: number;
  receiverId: number;
}

export interface MessageDetailDTO extends MessageDTO {
  sender?: {
    id: number;
    name: string;
    email: string;
  };
  receiver?: {
    id: number;
    name: string;
    email: string;
  };
}
