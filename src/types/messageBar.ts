import { MessageBarIntents } from "../enum/messageBar.enum";

export interface MessageBarProps {
  intent?: MessageBarIntents;
  message?: string;
  title?: string;
}
