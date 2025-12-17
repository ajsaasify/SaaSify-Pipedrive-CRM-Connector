import { PDButtonSize } from "@template/enum/pipedrive.enum";
import PDButton from "../ui-components/pipedriveButton";
import { Dispatch, SetStateAction } from "react";
import { CoSellItem } from "@template/types/api/getListCosellAssociateCrm.t";
import { useTranslation } from "react-i18next";

export const cosellTableColumns = (
  setCurrentCosell: Dispatch<SetStateAction<CoSellItem | null>>
) => {
  const { t } = useTranslation();
  const columns = [
    {
      field: "CloudProviderIdentifier",
      header: t("awsCosell.overview.opportunityId"),
    },
    { field: "OpportunityName", header: t("awsCosell.overview.opportunityOwnership") },
    { field: "Customer", header: t("awsCosell.overview.customerCompanyName") },
    {
      field: "CloudProviderStage",
      header: t("awsCosell.overview.stage"),
    },
    {
      field: "CloudProviderStatus",
      header: t("awsCosell.overview.status"),
    },
    {
      field: "",
      header: "Actions",
      body: (rowData: any) => (
        <PDButton
        className="pi pi-ellipsis-h back-btn"
          size={PDButtonSize.ICON_SMALL}
          onClick={() => {
            setCurrentCosell(rowData);
          }}
        ></PDButton>  
      ),
    },
  ];
  return columns;
};
