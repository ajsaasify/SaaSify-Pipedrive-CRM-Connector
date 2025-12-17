import { AlertTitle, AlertType } from "../../enum/alert.enum";
import { ResponseStatus } from "../../enum/response.enum";
import { generateMessage } from "./generateMessage";

export interface AlertNotification {
  title: string;
  type: string;
  message: string;
}

export function getErrorAlert(message: string): AlertNotification {
  return getAlert(message, AlertType.ERROR);
}

export function getSuccessAlert(message: string): AlertNotification {
  return getAlert(message, AlertType.SUCCESS);
}

export function getInfoAlert(message: string): AlertNotification {
  return getAlert(message, AlertType.INFO);
}

const getAlert = (message: string, type: string): AlertNotification => {
  const title = {
    [AlertType.ERROR]: AlertTitle.ERROR,
    [AlertType.SUCCESS]: AlertTitle.SUCCESS,
    [AlertType.INFO]: AlertTitle.INFO,
  }[type] || AlertTitle.INFO;

  const errorMessage = message.includes(ResponseStatus.SERVER_ERROR)
    ? generateMessage.errorMessage
    : message.includes(ResponseStatus.GATEWAY_ERROR)
    ? generateMessage.gatewayMessage
    : message;

  return {
    title: message.includes(ResponseStatus.GATEWAY_ERROR) ? AlertTitle.INFO : title,
    type: message.includes(ResponseStatus.GATEWAY_ERROR) ? AlertType.INFO : type,
    message: errorMessage,
  };
};

