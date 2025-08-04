export type NotificationContentProps = {
  title?: string;
  id?: number;
  profileImg?: string;
  messageParts: part[];
  redirectUrl?: string;
  createdAt?: string;
  read?: boolean;
  buttonField?: boolean;
};

type part = { type: string; value: string };
