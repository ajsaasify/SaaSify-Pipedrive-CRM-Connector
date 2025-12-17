import { Contact, RC3CosellResponse } from "@template/types/cosellResponse";
import { PDColumnConfig } from "@template/types/pipedrive-table-interface";
export const ContactTableColumns: PDColumnConfig[] = [
  {
    field: "title",
    header: "CONTACT TYPE",
  },
  {
    field: "name",
    header: "CONTACT NAME",
  },
  { field: "email", header: "CONTACT EMAIL" },
  { field: "phone", header: "PRIMARY CONTACT PHONE" },
];