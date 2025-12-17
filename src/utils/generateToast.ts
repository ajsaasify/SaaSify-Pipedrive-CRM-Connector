import { Severity, Summary } from "@template/enum/toast.enum";

export interface ToastMessageProps {
  severity: Severity;
  summary: Summary;
  detail: string;
  sticky?: boolean;
  life?: number;
}
const generateToastMessage = (
  severity: Severity,
  summary: Summary,
  detail: string,
  sticky: boolean = false,
): ToastMessageProps => {
  if (!sticky) return { severity, summary, detail, life: 3000 };
  return { severity, summary, detail, sticky };
};

// It returns the properties for displaying an success toast message.
export const getAlertSuccess = (details: string, sticky = false) => {
  return generateToastMessage(
    Severity.SUCCESS,
    Summary.SUCCESS,
    details,
    sticky,
  );
};

// It returns the properties for displaying an error toast message.
export const getAlertError = (details: string, sticky = false) =>
  generateToastMessage(Severity.ERROR, Summary.ERROR, details, sticky);

// It returns the properties for displaying an info toast message.
export const getAlertInfo = (details: string, sticky = false) =>
  generateToastMessage(Severity.INFO, Summary.INFO, details, sticky);

// It returns the properties for displaying an warn toast message.
export const getAlertWarn = (details: string, sticky = false) =>
  generateToastMessage(Severity.WARN, Summary.WARNING, details, sticky);
