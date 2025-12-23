import { MessageBarIntents } from "@template/enum/messageBar.enum";

export interface MessageBarProps {
  intent?: MessageBarIntents;
  message?: string;
  title?: string;
}
