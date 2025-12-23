import type { PDColumnConfig } from "@template/types/pipedrive-table-interface";
import { t } from "i18next";
export const ContactTableColumns: PDColumnConfig[] = [
  {
    field: "title",
    header: t("awsCosell.tableColumn.contact.0"),
  },
  {
    field: "name",
    header: t("awsCosell.tableColumn.contact.1"),
  },
  { field: "email", header: t("awsCosell.tableColumn.contact.2") },
  { field: "phone", header: t("awsCosell.tableColumn.contact.3") },
];
