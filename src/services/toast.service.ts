import type { Toast } from "primereact/toast";

let toastRef: Toast | null = null;

export const ToastService = {
  setRef(ref: Toast | null) {
    toastRef = ref;
  },

  show({
    severity,
    summary,
    detail,
    life = 2000,
  }: {
    severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast";
    summary: string;
    detail?: string;
    life?: number;
  }) {
    toastRef?.show({ severity, summary, detail, life });
  },

  success(summary: string, detail?: string) {
    this.show({ severity: "success", summary, detail });
  },

  info(summary: string, detail?: string) {
    this.show({ severity: "info", summary, detail });
  },

  warn(summary: string, detail?: string) {
    this.show({ severity: "warn", summary, detail });
  },

  error(summary: string, detail?: string) {
    this.show({ severity: "error", summary, detail });
  },

  secondary(summary: string, detail?: string) {
    this.show({ severity: "secondary", summary, detail });
  },

  contrast(summary: string, detail?: string) {
    this.show({ severity: "contrast", summary, detail });
  },
};
