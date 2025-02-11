export interface IChat extends Document {
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: Date;
  }