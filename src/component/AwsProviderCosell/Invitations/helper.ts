import { opportunityTeam } from "@template/common/constants/opportunityTeam";
import type { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import type { OpportunityTeam } from "@template/types/cosellResponse";
import { getFullName } from "@template/utils/globalHelper";
import { t } from "i18next";
export const invitationColumns = [
  {
    field: "",
    header: t("awsCosell.multipartner.tableHeader.name"),
    body: (rowData: CoSellItem) => {
      return getFullName(rowData as OpportunityTeam);
    },
  },
  {
    field: "Email",
    header: t("awsCosell.multipartner.tableHeader.email"),
  },
  {
    field: "Title",
    header: t("awsCosell.multipartner.tableHeader.title"),
    body: (rowData: any) => {
      return (opportunityTeam as any)[rowData?.BusinessTitle ?? ""] ?? rowData?.BusinessTitle;
    },
  },
];
