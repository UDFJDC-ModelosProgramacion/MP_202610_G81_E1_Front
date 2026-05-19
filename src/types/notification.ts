export interface NotificationDTO {
  id?: number;
  message: string;
  date: string;       // ISO date: "YYYY-MM-DD"
  isRead: boolean;
  userId: number;
}

export interface NotificationDetailDTO extends NotificationDTO {
  user?: {
    id: number;
    name: string;
    email: string;
  };
}
