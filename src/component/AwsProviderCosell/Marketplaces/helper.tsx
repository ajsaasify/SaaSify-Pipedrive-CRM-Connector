import { Contact, RC3CosellResponse } from "@template/types/cosellResponse";
import { PDColumnConfig } from "@template/types/pipedrive-table-interface";
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
    header: "AGREEMENT ID",
  },
  {
    field: "AcceptanceTime",
    header: "CREATED DATE",
  },
  { field: "ServiceStartDate", header: "SERVICE START DATE" },
  { field: "ServiceEndDate", header: "SERVICE END DATE" },
  { field: "OfferID", header: "OFFER ID" },
];
