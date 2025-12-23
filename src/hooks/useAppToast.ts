import type { Toast } from "primereact/toast";
import type { RefObject } from "react";

export const useAppToast = (toastRef: RefObject<Toast>) => {
  const show = (
    severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast",
    summary: string,
    detail = "",
    life = 3000,
  ) => {
    toastRef.current?.show({
      severity,
      summary,
      detail,
      life,
    });
  };

  return {
    success: (summary: string, detail?: string) =>
      show("success", summary, detail),

    info: (summary: string, detail?: string) => show("info", summary, detail),

    warn: (summary: string, detail?: string) => show("warn", summary, detail),

    error: (summary: string, detail?: string) => show("error", summary, detail),

    secondary: (summary: string, detail?: string) =>
      show("secondary", summary, detail),

    contrast: (summary: string, detail?: string) =>
      show("contrast", summary, detail),
  };
};
