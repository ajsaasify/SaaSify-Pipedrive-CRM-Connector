import { PDColumnConfig } from "@template/types/pipedrive-table-interface";
import { t } from "i18next";
export interface agreementType{
    AgreementID?:string,
    AcceptanceTime?:string,
    ServiceStartDate?:string,
    ServiceEndDate?:string,
    OfferID?:string,
}
export const AggrementTableColumn: PDColumnConfig[] = [
  {
    field: "AgreementID",
    header: t("awsCosell.tableColumn.aggrement.0"),
  },
  {
    field: "AcceptanceTime",
    header:  t("awsCosell.tableColumn.aggrement.1"),
  },
  { field: "ServiceStartDate", header:  t("awsCosell.tableColumn.aggrement.2") },
  { field: "ServiceEndDate", header:  t("awsCosell.tableColumn.aggrement.3")},
  { field: "OfferID", header:  t("awsCosell.tableColumn.aggrement.4")},
];
