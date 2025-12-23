import type { PDColumnConfig } from "@template/types/pipedrive-table-interface";
import { t } from "i18next";
export const NextStepColumns: PDColumnConfig[] = [
  {
    field: "Value",
    header: t("awsCosell.tableColumn.nextStep.0"),
  },
  {
    field: "Time",
    header: t("awsCosell.tableColumn.nextStep.1"),
  },
];
