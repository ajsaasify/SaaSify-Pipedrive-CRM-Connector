export const statusConfig: Record<string, { icon: string; color: string }> = {
  Accepted: {
    icon: "pi pi-check-circle",
    color: "#76DF96",
  },
  Approved: {
    icon: "pi pi-verified",
    color: "#76DF96",
  },
  Submitted: {
    icon: "pi pi-send",
    color: "#1F7FFF",
  },
  "Pending Submission": {
    icon: "pi pi-clock",
    color: "#F1B408",
  },
  Expired: {
    icon: "pi pi-exclamation-triangle",
    color: "#FF0000",
  },
  Pending: {
    icon: "pi pi-clock",
    color: "#F1B408",
  },
  Rejected: {
    icon: "pi pi-times-circle",
    color: "#FF0000",
  },
  "Action Required": {
    icon: "pi pi-exclamation-triangle",
    color: "#F1B408",
  },
};
